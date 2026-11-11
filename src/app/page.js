import { getRooms } from "./lib/rooms";
import { getBookings } from "./lib/bookings";

export default async function Home() {
  const rooms = await getRooms();
  const bookings = await getBookings()
  return (
    <main>
      <h1>Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
      <h1>Bookings</h1>
<ul>
  {
    bookings.map((booking) =>(
      <li key={booking.id}>{booking.title} : {booking.roomId}</li>
    ))
  }
</ul>
    
    </main>
  );
}
