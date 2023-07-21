const router = require('express').Router()
const controller = require('../controller/pacienteController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosPacientes) 
router.post("", validateToken, controller.crearPaciente) 
router.get("/:id", validateToken, controller.obtenerPacientePorId) 
router.put("/:id", validateToken, controller.actualizarPaciente) 
router.delete("/:id", validateToken, controller.eliminarPaciente) 

module.exports = { router }