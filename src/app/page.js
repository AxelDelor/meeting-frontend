import { getRooms } from "./lib/api";
import RoomList from "./components/RoomList";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main>
      <h1>Available rooms</h1>
      <RoomList rooms={rooms} />
    </main>
  );
}
