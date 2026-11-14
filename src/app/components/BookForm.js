"use client";

import { useActionState } from "react";
import { createBookingAction } from "../lib/actions";

export default function BookForm({ roomId }) {
  const [state, action] = useActionState(createBookingAction, {
    error: null,
    success: false,
    values: { title: "", organizer: "", startTime: "", endTime: "" },
  });

  return (
    <>
      <form action={action} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium ">Titre de la réservation</label>
          <input
            name="title"
            type="text"
            defaultValue={state.values.title}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Réu du 15"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">Organisateur.trice</label>
          <input
            name="organizer"
            type="text"
            defaultValue={state.values.organizer}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Jane Doe"
          />
        </div>
        <input type="hidden" name="roomId" value={roomId} />
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">Horaire de début</label>
          <input
            name="startTime"
            type="datetime-local"
            defaultValue={state.values.startTime}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium">Horaire de fin</label>
          <input
            name="endTime"
            type="datetime-local"
            defaultValue={state.values.endTime}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        {state.error === null ? <p>tout va bien</p> : <p>{state.error}</p>}
        <button
          type="submit"
          className="bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Valider
        </button>
      </form>
    </>
  );
}
