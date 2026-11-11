const API_URL = "http://localhost:8080";

export async function getRooms() {
  const response = await fetch(`${API_URL}/rooms`);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json()
}
