"use client";

import { useActionState } from "react";
import { createBookingAction } from "../lib/actions";

export default function BookForm({ roomId }) {
  const [state, action, isPending] = useActionState(createBookingAction, {
    error: null,
    success: false,
    values: { title: "", organizer: "", startTime: "", endTime: "" },
  });

  return (
    <>
      <form action={action} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium ">Booking title</label>
          <input
            name="title"
            maxLength={60}
            required
            type="text"
            defaultValue={state.values.title}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Réu du 15"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">Organizer</label>
          <input
            name="organizer"
            maxLength={60}
            required
            type="text"
            defaultValue={state.values.organizer}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Jane Doe"
          />
        </div>
        <input type="hidden" name="roomId" value={roomId} />
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">Start time</label>
          <input
            name="startTime"
            required
            type="datetime-local"
            defaultValue={state.values.startTime}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">End time</label>
          <input
            name="endTime"
            required
            type="datetime-local"
            defaultValue={state.values.endTime}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        {state.error === null ? null : <p>{state.error}</p>}
        {state.success ? <p>Your booking has successfully been recorded</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Confirm
        </button>
      </form>
    </>
  );
}
