import { appState } from "../state/appState.js";
import {
  fetchTareas,
  crearTarea,
  actualizarTarea,
  eliminarTareaApi,
  toggleCompletarTareaApi,
} from "../api/tareasApi.js";
import { renderizarTareas } from "../ui/renderTareas.js";
import { mostrarMensaje } from "../ui/mensajes.js";
import { mostrarLoading, ocultarLoading } from "../ui/loading.js";
import { deshabilitarElemento, habilitarElemento } from "../ui/bloqueoUI.js";

const modalOverlay = document.getElementById("modalOverlay");
const modalTexto = document.getElementById("modalTexto");
const modalCrearOverlay = document.getElementById("modalCrearOverlay");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function cargarTareas() {
  try {
    mostrarLoading();
    appState.tareas = await fetchTareas();
    renderizarTareas();
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    mostrarMensaje("❌ Error al cargar tareas", "error");
  } finally {
    ocultarLoading();
  }
}

export function handleCargarTareaParaEditar(tarea) {
  appState.tareaEditandoId = tarea._id;
  renderizarTareas();
}

export function resetFormulario() {}

export function handleCancelarEdicion() {
  appState.tareaEditandoId = null;
  renderizarTareas();
  mostrarMensaje("✋ Edición cancelada");
}

export function abrirModalEliminar(id) {
  appState.tareaAEliminarId = id;

  const tarea = appState.tareas.find((t) => t._id === id);

  if (tarea) {
    modalTexto.textContent = `¿Seguro que quieres eliminar la tarea "${tarea.titulo}"?`;
  } else {
    modalTexto.textContent = "¿Seguro que quieres eliminar esta tarea?";
  }

  modalOverlay.classList.remove("oculto");
}

export function cerrarModalEliminar() {
  appState.tareaAEliminarId = null;
  modalOverlay.classList.add("oculto");
}

export async function confirmarEliminarTarea() {
  if (!appState.tareaAEliminarId) return;

  const id = appState.tareaAEliminarId;
  const tarjeta = document.querySelector(`[data-id="${id}"]`);

  try {
    await eliminarTareaApi(id);

    if (appState.tareaEditandoId === id) {
      appState.tareaEditandoId = null;
    }

    cerrarModalEliminar();

    if (tarjeta) {
      tarjeta.classList.add("eliminando");
      await esperar(280);
    }

    mostrarMensaje("🗑️ Tarea eliminada correctamente");
    await cargarTareas();
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    mostrarMensaje("❌ Error al eliminar tarea", "error");
    cerrarModalEliminar();
  }
}

export function handleEliminarTarea(id) {
  abrirModalEliminar(id);
}

export function abrirModalCrear() {
  modalTitulo.value = "";
  modalDescripcion.value = "";
  modalCrearOverlay.classList.remove("oculto");
}

export function cerrarModalCrear() {
  modalCrearOverlay.classList.add("oculto");
}

export async function guardarNuevaTareaDesdeModal() {
  const titulo = modalTitulo.value.trim();
  const descripcion = modalDescripcion.value.trim();

  if (!titulo) {
    mostrarMensaje("⚠️ El título es obligatorio", "error");
    return;
  }

  try {
    const tareaCreada = await crearTarea({ titulo, descripcion });

    appState.tareaNuevaId = tareaCreada._id;
    appState.tareaEditadaId = null;

    mostrarMensaje("✅ Tarea creada correctamente");
    cerrarModalCrear();
    await cargarTareas();
  } catch (error) {
    console.error(error);
    mostrarMensaje("❌ Error al crear tarea", "error");
  }
}

export async function handleCompletarTarea(id) {
  try {
    await toggleCompletarTareaApi(id);

    mostrarMensaje("🔄 Estado actualizado");
    await cargarTareas();
  } catch (error) {
    console.error("Error al completar tarea:", error);
    mostrarMensaje("❌ Error al cambiar estado", "error");
  }
}

export async function handleGuardarEdicionInline(id, titulo, descripcion) {
  if (!titulo.trim()) {
    mostrarMensaje("⚠️ El título es obligatorio", "error");
    return;
  }

  try {
    const tareaActualizada = await actualizarTarea(id, {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
    });

    appState.tareaEditandoId = null;
    appState.tareaEditadaId = tareaActualizada._id;
    appState.tareaNuevaId = null;

    mostrarMensaje("✅ Tarea actualizada correctamente");
    await cargarTareas();
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    mostrarMensaje("❌ No se pudo actualizar la tarea", "error");
  }
}
