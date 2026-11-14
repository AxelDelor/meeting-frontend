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
    return { error: "Le titre est obligatoire", success: false, values };
  }
  if (title.trim().length > 60) {
    return { error: "Le titre ne peut pas faire plus de 60 caractères", success: false, values };
  }

  if (!organizer || organizer.trim().length === 0) {
    return { error: "Le nom de l'organisateur.trice est obligatoire", success: false, values };
  }
  if (organizer.trim().length > 60) {
    return {
      error: "Le nom de l'organisateur.trice ne peut pas faire plus de 60 caractères",
      success: false,
      values,
    };
  }

  if (!(Number.isInteger(roomId) && roomId > 0)) {
    return { error: "Salle invalide", success: false, values };
  }

  if (!startTime || startTime.trim().length === 0) {
    return { error: "L'horaire de départ est obligatoire", success: false, values };
  }

  if (!endTime || endTime.trim().length === 0) {
    return { error: "L'horaire de fin est obligatoire", success: false, values };
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
  return { error: null, success: true };
}
