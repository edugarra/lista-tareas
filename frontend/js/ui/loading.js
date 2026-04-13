const loadingElement = document.getElementById("loading");

export function mostrarLoading() {
  loadingElement.style.display = "block";
}

export function ocultarLoading() {
  loadingElement.style.display = "none";
}