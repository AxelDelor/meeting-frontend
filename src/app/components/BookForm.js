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
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-5">
      <form action={action} className="card-body">
        <div className="mb-5">
          <label className="label">Booking title</label>
          <input
            name="title"
            maxLength={60}
            required
            type="text"
            defaultValue={state.values.title}
            className="input"
            placeholder="Réu du 15"
          />
        </div>
        <div className="mb-5">
          <label className="label">Organizer</label>
          <input
            name="organizer"
            maxLength={60}
            required
            type="text"
            defaultValue={state.values.organizer}
            className="input"
            placeholder="Jane Doe"
          />
        </div>
        <input type="hidden" name="roomId" value={roomId} />
        <div className="mb-5">
          <label className="label">Start time</label>
          <input
            name="startTime"
            required
            type="datetime-local"
            defaultValue={state.values.startTime}
            className="input"
          />
        </div>
        <div className="mb-5">
          <label className="label">End time</label>
          <input
            name="endTime"
            required
            type="datetime-local"
            defaultValue={state.values.endTime}
            className="input"
          />
        </div>
        {state.error === null ? null : <p>{state.error}</p>}
        {state.success ? <p>Your booking has successfully been recorded</p> : null}
        <button type="submit" disabled={isPending} className="btn">
          Confirm
        </button>
      </form>
    </div>
  );
}
