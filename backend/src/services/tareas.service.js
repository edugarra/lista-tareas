const Tarea = require("../models/Tarea");

async function obtenerTodasLasTareas() {
  return await Tarea.find().sort({ createdAt: -1 });
}

async function obtenerTareaPorId(id) {
  return await Tarea.findById(id);
}

async function crearTarea(data) {
  return await Tarea.create(data);
}

async function actualizarTarea(id, data) {
  return await Tarea.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function eliminarTarea(id) {
  return await Tarea.findByIdAndDelete(id);
}

async function toggleCompletarTarea(id) {
  const tarea = await Tarea.findById(id);

  if (!tarea) {
    return null;
  }

  tarea.completada = !tarea.completada;
  await tarea.save();

  return tarea;
}

module.exports = {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  toggleCompletarTarea,
};