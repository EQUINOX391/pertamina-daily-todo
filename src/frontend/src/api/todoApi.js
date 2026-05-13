import httpClient from "./httpClient";

export async function getTodos() {
  const response = await httpClient.get("/todos");
  return response.data;
}

export async function createTodo(payload) {
  const response = await httpClient.post("/todos", payload);
  return response.data;
}

export async function updateTodo(id, payload) {
  const response = await httpClient.put(`/todos/${id}`, payload);
  return response.data;
}

export async function deleteTodo(id) {
  await httpClient.delete(`/todos/${id}`);
}
