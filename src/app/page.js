import { getRooms } from "./lib/rooms";
import RoomList from "./components/RoomList";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main>
      <h1>Salles disponibles</h1>
      <RoomList rooms={rooms} />
    </main>
  );
}
