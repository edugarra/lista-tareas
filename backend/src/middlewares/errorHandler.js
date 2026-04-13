function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Error de validación",
      detalles: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "ID inválido",
    });
  }

  res.status(500).json({
    error: "Error interno del servidor",
  });
}

module.exports = errorHandler;