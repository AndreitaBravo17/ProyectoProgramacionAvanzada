const router = require('express').Router()
const controller = require('../controller/especialidadController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerEspecialidades) 

module.exports = { router }