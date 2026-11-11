import { getRooms } from "./lib/rooms";

export default async function Home() {
  const rooms = await getRooms();
  return (
    <main>
      <h1> Coucou </h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </main>
  );
}
