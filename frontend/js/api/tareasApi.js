import { API_URL } from "../config/config.js";

export async function fetchTareas() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function crearTarea(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Error al crear tarea");
  }

  return result;
}

export async function actualizarTarea(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Error al actualizar tarea");
  }

  return result;
}

export async function eliminarTareaApi(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar tarea");
  }

  return await res.json();
}

export async function toggleCompletarTareaApi(id) {
  const res = await fetch(`${API_URL}/${id}/completar`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Error al completar tarea");
  }

  return await res.json();
}