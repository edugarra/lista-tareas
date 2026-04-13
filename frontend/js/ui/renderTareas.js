import { appState } from "../state/appState.js";
import {
  handleCompletarTarea,
  handleEliminarTarea,
  handleCargarTareaParaEditar,
  handleCancelarEdicion,
  handleGuardarEdicionInline,
} from "../handlers/tareasHandlers.js";

const lista = document.getElementById("listaTareas");
const buscador = document.getElementById("buscador");
const filtroEstado = document.getElementById("filtroEstado");
const ordenarPor = document.getElementById("ordenarPor");
const totalTareas = document.getElementById("totalTareas");
const tareasPendientes = document.getElementById("tareasPendientes");
const tareasCompletadas = document.getElementById("tareasCompletadas");

function actualizarResumen() {
  const total = appState.tareas.length;
  const completadas = appState.tareas.filter(
    (tarea) => tarea.completada,
  ).length;
  const pendientes = total - completadas;

  totalTareas.textContent = total;
  tareasPendientes.textContent = pendientes;
  tareasCompletadas.textContent = completadas;
}

export function renderizarTareas() {
  lista.innerHTML = "";
  actualizarResumen();

  let tareasFiltradas = [...appState.tareas];

  const textoBusqueda = buscador.value.trim().toLowerCase();
  if (textoBusqueda) {
    tareasFiltradas = tareasFiltradas.filter((tarea) =>
      tarea.titulo.toLowerCase().includes(textoBusqueda),
    );
  }

  const estado = filtroEstado.value;
  if (estado === "completadas") {
    tareasFiltradas = tareasFiltradas.filter((tarea) => tarea.completada);
  } else if (estado === "pendientes") {
    tareasFiltradas = tareasFiltradas.filter((tarea) => !tarea.completada);
  }

  const orden = ordenarPor.value;
  if (orden === "fecha_desc") {
    tareasFiltradas.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } else if (orden === "fecha_asc") {
    tareasFiltradas.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  } else if (orden === "estado") {
    tareasFiltradas.sort((a, b) => Number(a.completada) - Number(b.completada));
  }

  if (tareasFiltradas.length === 0) {
    const hayFiltrosActivos =
      textoBusqueda ||
      filtroEstado.value !== "todas" ||
      ordenarPor.value !== "fecha_desc";

    const li = document.createElement("li");

    if (hayFiltrosActivos) {
      li.innerHTML = `
        <div class="mensaje-vacio">
          🔎 No se encontraron tareas con esos filtros.
        </div>
      `;
    } else {
      li.innerHTML = `
        <div class="mensaje-vacio">
          📭 No tienes tareas todavía.<br>
          👉 Crea tu primera tarea usando el formulario.
        </div>
      `;
    }

    lista.appendChild(li);
    return;
  }

  tareasFiltradas.forEach((tarea) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.classList.add(tarea.completada ? "completada" : "pendiente");
    li.dataset.id = tarea._id;

    if (appState.tareaNuevaId === tarea._id) {
      li.classList.add("nueva");
    }

    if (appState.tareaEditadaId === tarea._id) {
      li.classList.add("editada");
    }

    const content = document.createElement("div");
    content.classList.add("task-content");

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    if (appState.tareaEditandoId === tarea._id) {
      const inputTituloEdit = document.createElement("input");
      inputTituloEdit.type = "text";
      inputTituloEdit.value = tarea.titulo;
      inputTituloEdit.classList.add("input-editar");

      const inputDescripcionEdit = document.createElement("input");
      inputDescripcionEdit.type = "text";
      inputDescripcionEdit.value = tarea.descripcion || "";
      inputDescripcionEdit.classList.add("input-editar");

      content.appendChild(inputTituloEdit);
      content.appendChild(inputDescripcionEdit);

      const btnGuardarInline = document.createElement("button");
      btnGuardarInline.classList.add("btn-editar");
      btnGuardarInline.textContent = "💾 Guardar";
      btnGuardarInline.addEventListener("click", () =>
        handleGuardarEdicionInline(
          tarea._id,
          inputTituloEdit.value,
          inputDescripcionEdit.value,
        ),
      );

      const btnCancelarInline = document.createElement("button");
      btnCancelarInline.classList.add("btn-eliminar");
      btnCancelarInline.textContent = "✖ Cancelar";
      btnCancelarInline.addEventListener("click", handleCancelarEdicion);

      actions.appendChild(btnGuardarInline);
      actions.appendChild(btnCancelarInline);
    } else {
      if (tarea.completada) {
        content.classList.add("tarea-completada");
      }

      const title = document.createElement("div");
      title.classList.add("task-title");
      title.textContent = tarea.titulo;

      const desc = document.createElement("div");
      desc.classList.add("task-desc");
      desc.textContent = tarea.descripcion || "Sin descripción";

      const meta = document.createElement("div");
      meta.classList.add("task-meta");
      meta.textContent = tarea.completada
        ? "Estado: completada"
        : "Estado: pendiente";

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(meta);

      const btnCompletar = document.createElement("button");
      btnCompletar.classList.add("btn-completar");
      btnCompletar.textContent = tarea.completada
        ? "↩️ Desmarcar"
        : "✅ Completar";
      btnCompletar.addEventListener("click", () =>
        handleCompletarTarea(tarea._id),
      );

      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn-editar");
      btnEditar.textContent = "✏️ Editar";
      btnEditar.addEventListener("click", () =>
        handleCargarTareaParaEditar(tarea),
      );

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn-eliminar");
      btnEliminar.textContent = "❌ Eliminar";
      btnEliminar.addEventListener("click", () =>
        handleEliminarTarea(tarea._id),
      );

      actions.appendChild(btnCompletar);
      actions.appendChild(btnEditar);
      actions.appendChild(btnEliminar);
    }

    li.appendChild(content);
    li.appendChild(actions);

    lista.appendChild(li);
  });

  if (appState.tareaNuevaId || appState.tareaEditadaId) {
    setTimeout(() => {
      appState.tareaNuevaId = null;
      appState.tareaEditadaId = null;
    }, 1200);
  }
}
