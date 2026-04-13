const tareasService = require("../services/tareas.service");

async function getTareas(req, res) {
  const tareas = await tareasService.obtenerTodasLasTareas();
  res.status(200).json(tareas);
}

async function getTareaById(req, res) {
  const tarea = await tareasService.obtenerTareaPorId(req.params.id);

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(tarea);
}

async function createTarea(req, res) {
  const nuevaTarea = await tareasService.crearTarea(req.body);
  res.status(201).json(nuevaTarea);
}

async function updateTarea(req, res) {
  const tareaActualizada = await tareasService.actualizarTarea(
    req.params.id,
    req.body
  );

  if (!tareaActualizada) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(tareaActualizada);
}

async function deleteTarea(req, res) {
  const tareaEliminada = await tareasService.eliminarTarea(req.params.id);

  if (!tareaEliminada) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
}

async function toggleCompletar(req, res) {
  const tareaActualizada = await tareasService.toggleCompletarTarea(req.params.id);

  if (!tareaActualizada) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(tareaActualizada);
}

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
  toggleCompletar,
};