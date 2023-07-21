const router = require('express').Router()
const controller = require('../controller/tiposHabitacion');
const { validateToken } = require("../middleware/validateToken")
router.get("", validateToken, controller.obtenerTodosTiposHabitacion) 

module.exports = { router }