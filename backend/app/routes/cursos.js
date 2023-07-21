const router = require('express').Router()
const controller = require('../controller/cursosController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosCursos) 
router.post("", validateToken, controller.crearCursos) 
router.get("/:id", validateToken, controller.obtenerCursosPorId) 
router.put("/:id", validateToken, controller.actualizarCursos) 
router.delete("/:id", validateToken, controller.eliminarCursos) 

module.exports = { router }
