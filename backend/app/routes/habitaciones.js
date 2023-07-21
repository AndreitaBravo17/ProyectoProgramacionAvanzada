const router = require('express').Router()
const controller = require('../controller/habitacionesController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodasHabitaciones) 
router.get("/:id", validateToken, controller.obtenerHabitacionPorId) 
router.post("", validateToken, controller.crearHabitacion) 
router.put("/:id", validateToken, controller.actualizarHabitacion) 
router.delete("/:id", validateToken, controller.eliminarHabitacion) 

module.exports = { router }