"use server";

import { revalidatePath } from "next/cache";
import { ApiError, createBooking } from "./api";

export async function createBookingAction(prevState, formData) {
  const title = formData.get("title");
  const organizer = formData.get("organizer");
  const roomId = Number(formData.get("roomId"));
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");

  const values = { title, organizer, roomId, startTime, endTime };

  if (!title || title.trim().length === 0) {
    return { error: "The title is mandatory", success: false, values };
  }
  if (title.trim().length > 60) {
    return { error: "The title must not go over 60 caracters", success: false, values };
  }

  if (!organizer || organizer.trim().length === 0) {
    return { error: "The name of the organizer is mandatory", success: false, values };
  }
  if (organizer.trim().length > 60) {
    return {
      error: "The name of the organizer must not go over 60 caracters",
      success: false,
      values,
    };
  }

  if (!(Number.isInteger(roomId) && roomId > 0)) {
    return { error: "This is not a valid room", success: false, values };
  }

  if (!startTime || startTime.trim().length === 0) {
    return { error: "The start time is mandatory", success: false, values };
  }

  if (!endTime || endTime.trim().length === 0) {
    return { error: "The end time is mandatory", success: false, values };
  }

  try {
    await createBooking({ title, organizer, roomId, startTime, endTime });
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, success: false, values };
    }
    throw error;
  }

  revalidatePath(`/rooms/${roomId}`);
  return {
    error: null,
    success: true,
    values: { title: "", organizer: "", startTime: "", endTime: "" },
  };
}
