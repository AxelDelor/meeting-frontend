import BookForm from "@/app/components/BookForm";
import { getRoom, getRoomBookings, ApiError } from "@/app/lib/api";
import { notFound } from "next/navigation";

export default async function RoomDetail({ params }) {
  const { id } = await params;

  let room;
  let roomBookings;

  try {

    [room, roomBookings] = await Promise.all([
      getRoom(id),
      getRoomBookings(id),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <main>
      <h1>{room.name}</h1>
      <p>Floor: {room.floor}</p>
      <p>Capacity: {room.capacity}</p>
      <h1>Bookings</h1>
      {roomBookings.length > 0 ? (
        roomBookings.map((rb) => (
          <ul key={rb.id}>
            <li>
              {rb.title} by {rb.organizer}, beginning:{" "}
              {new Date(rb.startTime).toLocaleString("fr-FR")} end:{" "}
              {new Date(rb.endTime).toLocaleString("fr-FR")}{" "}
            </li>
          </ul>
        ))
      ) : (
        <p>There is no bookings for now</p>
      )}
      <BookForm roomId={id}/>
    </main>
  );
}
