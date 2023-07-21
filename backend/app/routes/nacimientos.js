const router = require('express').Router()
const controller = require('../controller/nacimientosController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerNacimientos) 
router.get("/:id", validateToken, controller.obtenerNacimientoPorId) 
router.post("", validateToken, controller.crearNacimiento) 
router.put("/:id", validateToken, controller.actualizarNacimiento) 
router.delete("/:id", validateToken, controller.eliminarNacimiento) 

module.exports = { router }