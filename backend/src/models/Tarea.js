const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede superar los 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [300, "La descripción no puede superar los 300 caracteres"],
      default: "",
    },
    completada: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Tarea", tareaSchema);