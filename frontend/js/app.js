import {
  cargarTareas,
  cerrarModalEliminar,
  confirmarEliminarTarea,
  abrirModalCrear,
  cerrarModalCrear,
  guardarNuevaTareaDesdeModal,
} from "./handlers/tareasHandlers.js";
import { renderizarTareas } from "./ui/renderTareas.js";

const buscador = document.getElementById("buscador");
const filtroEstado = document.getElementById("filtroEstado");
const ordenarPor = document.getElementById("ordenarPor");

const btnModalCancelar = document.getElementById("btnModalCancelar");
const btnModalEliminar = document.getElementById("btnModalEliminar");
const modalOverlay = document.getElementById("modalOverlay");

const btnFlotante = document.getElementById("btnFlotante");
const btnModalCrearCancelar = document.getElementById("btnModalCrearCancelar");
const btnModalCrearGuardar = document.getElementById("btnModalCrearGuardar");
const modalCrearOverlay = document.getElementById("modalCrearOverlay");


buscador.addEventListener("input", renderizarTareas);
filtroEstado.addEventListener("change", renderizarTareas);
ordenarPor.addEventListener("change", renderizarTareas);

btnModalCancelar.addEventListener("click", cerrarModalEliminar);
btnModalEliminar.addEventListener("click", confirmarEliminarTarea);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    cerrarModalEliminar();
  }
});

btnFlotante.addEventListener("click", abrirModalCrear);
btnModalCrearCancelar.addEventListener("click", cerrarModalCrear);
btnModalCrearGuardar.addEventListener("click", guardarNuevaTareaDesdeModal);

modalCrearOverlay.addEventListener("click", (e) => {
  if (e.target === modalCrearOverlay) {
    cerrarModalCrear();
  }
});

cargarTareas();