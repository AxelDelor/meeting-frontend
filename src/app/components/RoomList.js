import Link from "next/link";

export default function RoomList({ rooms }) {
  return (
    <>
      {rooms.map((room) => (
        <Link href={`/rooms/${room.id}`} key={room.id}>
          <p>{room.name}</p>
        </Link>
      ))}
    </>
  );
}
