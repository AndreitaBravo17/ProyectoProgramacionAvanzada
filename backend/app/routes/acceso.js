const router = require('express').Router()
const controller = require('../controller/accesoController');

router.post("/auth", controller.obtenerAcceso) 

module.exports = { router }