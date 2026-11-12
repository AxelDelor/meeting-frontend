const API_URL = "http://localhost:8080";

export async function getRoomBookings(roomId) {
  const response = await fetch(`${API_URL}/bookings?roomId=${roomId}`);

  return responseGuard(response);
}

export async function getRooms() {
  const response = await fetch(`${API_URL}/rooms`);

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
        this.status = status
    } 
}