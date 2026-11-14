export async function getRoomBookings(roomId) {
  const response = await fetch(
    `${process.env.API_URL}/bookings?roomId=${encodeURIComponent(roomId)}`,
    { cache: "no-store" },
  );

  return responseGuard(response);
}

export async function createBooking(title, organizer, roomId, startTime, endTime) {
  const response = await fetch(`${process.env.API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      organizer,
      roomId,
      startTime,
      endTime,
    }),
  });

  return responseGuard(response);
}

export async function getRooms() {
  const response = await fetch(`${process.env.API_URL}/rooms`, {
    cache: "no-store",
  });

  return responseGuard(response);
}

export async function getRoom(id) {
  const response = await fetch(`${process.env.API_URL}/rooms/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  return responseGuard(response);
}

// private

async function responseGuard(response) {
  if (!response.ok) {
    const errorBody = await response.json();
    throw new ApiError(response.status, errorBody.detail);
  }

  return response.json();
}

export class ApiError extends Error {
  constructor(status, detail) {
    super(detail);
    this.status = status;
  }
}
