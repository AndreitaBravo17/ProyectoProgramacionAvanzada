const mongoose = require('mongoose');

const accesoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  clave: { type: String, required: true }
});

const Acceso = mongoose.model('usuarios', accesoSchema, 'usuarios');

module.exports = Acceso;
