const router = require('express').Router()
const controller = require('../controller/consultasController');
const { validateToken } = require("../middleware/validateToken")

router.get("", validateToken, controller.obtenerConsultas) 
router.get("/:id", validateToken, controller.obtenerConsultaPorId) 
router.post("", validateToken, controller.agregarConsulta) 
router.put("/:id", validateToken, controller.modificarConsulta) 
router.delete("/:id", validateToken, controller.eliminarConsulta) 

module.exports = { router }