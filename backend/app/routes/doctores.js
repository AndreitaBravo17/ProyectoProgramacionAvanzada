const router = require('express').Router()
const controller = require('../controller/doctorController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosDoctores) 
router.post("", validateToken, controller.crearDoctor) 
router.get("/:id", validateToken, controller.obtenerDoctorPorId) 
router.put("/:id", validateToken, controller.actualizarDoctor) 
router.delete("/:id", validateToken, controller.eliminarDoctor) 

module.exports = { router }