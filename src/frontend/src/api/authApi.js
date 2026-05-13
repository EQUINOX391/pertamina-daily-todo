import httpClient from "./httpClient";

export async function registerUser(payload) {
  const response = await httpClient.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await httpClient.post("/auth/login", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await httpClient.get("/auth/me");
  return response.data;
}
