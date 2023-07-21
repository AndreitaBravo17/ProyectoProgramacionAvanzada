const router = require('express').Router()
const controller = require('../controller/tiposPartoController');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosTiposParto) 

module.exports = { router }