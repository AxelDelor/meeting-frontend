const API_URL = "http://localhost:8080";

export async function getRoomBookings(roomId) {
  const response = await fetch(`${API_URL}/bookings?roomId=${roomId}`);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }
  return response.json();
}
