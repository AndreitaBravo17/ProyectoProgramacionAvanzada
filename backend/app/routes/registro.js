const router = require('express').Router()
const controller = require('../controller/registroController');
const { validateToken } = require("../middleware/validateToken")
router.get("",validateToken, controller.obtenerTodosRegistro) 
router.post("",validateToken, controller.crearRegistro) 
router.get("/:id",validateToken, controller.obtenerRegistroPorId) 
router.put("/:id", validateToken,controller.actualizarRegistro) 
router.delete("/:id",validateToken, controller.eliminarRegistro) 

module.exports = { router }