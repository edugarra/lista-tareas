const contenedorMensaje = document.getElementById("mensaje");

let timeoutMensaje = null;

export function mostrarMensaje(texto, tipo = "ok") {
  contenedorMensaje.textContent = texto;
  contenedorMensaje.className = `mensaje ${tipo}`;

  clearTimeout(timeoutMensaje);

  timeoutMensaje = setTimeout(() => {
    limpiarMensaje();
  }, 3000);
}

export function limpiarMensaje() {
  contenedorMensaje.textContent = "";
  contenedorMensaje.className = "";
}