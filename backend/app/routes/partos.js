const router = require('express').Router()
const controller = require('../controller/partosController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosPartos) 
router.get("/:id", validateToken, controller.obtenerPartoPorId) 
router.post("", validateToken, controller.crearParto) 
router.put("/:id", validateToken, controller.actualizarParto) 
router.delete("/:id", validateToken, controller.eliminarParto) 

module.exports = { router }