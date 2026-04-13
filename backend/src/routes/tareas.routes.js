const express = require("express");
const router = express.Router();

const tareasController = require("../controllers/tareas.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.get("/", asyncHandler(tareasController.getTareas));
router.get("/:id", asyncHandler(tareasController.getTareaById));
router.post("/", asyncHandler(tareasController.createTarea));
router.put("/:id", asyncHandler(tareasController.updateTarea));
router.delete("/:id", asyncHandler(tareasController.deleteTarea));
router.patch("/:id/completar", asyncHandler(tareasController.toggleCompletar));

module.exports = router;