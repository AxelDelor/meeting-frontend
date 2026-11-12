import { getRooms, getRoomBookings, ApiError } from "@/app/lib/api";
import { notFound } from "next/navigation";

export default async function RoomDetail({ params }) {
  const { id } = await params;

  let rooms;
  let roomBookings;
  let room;

  try {
    rooms = await getRooms();
    roomBookings = await getRoomBookings(id);
    room = rooms.find((r) => r.id === Number(id));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <main>
      <h1>{room.name}</h1>
      <p>Étage: {room.floor}</p>
      <p>Capacité: {room.capacity}</p>
      <h1>Réservations</h1>
      {roomBookings.length > 0 ? (
        roomBookings.map((rb) => (
          <ul key={rb.id}>
            <li>
              {rb.title} par {rb.organizer}, début:{" "}
              {new Date(rb.startTime).toLocaleString("fr-FR")} fin:{" "}
              {new Date(rb.endTime).toLocaleString("fr-FR")}{" "}
            </li>
          </ul>
        ))
      ) : (
        <p>Aucune réservations pour le moment</p>
      )}
    </main>
  );
}
