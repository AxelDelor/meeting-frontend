import { getRooms } from "../../lib/rooms";
import { getRoomBookings } from "@/app/lib/bookings";

export default async function RoomDetail({ params }) {
  const { id } = await params;
  const roomBookings = await getRoomBookings(id);
  const rooms = await getRooms();
  const room = rooms.find((r) => r.id === Number(id));

  if (!room) {
    return <h1>Salle introuvable</h1>;
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
