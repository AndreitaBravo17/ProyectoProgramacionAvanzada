const mongoose = require('mongoose');

const nacimientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  peso: { type: Number, required: true },
  genero: { type: Number, required: true },
  enfermedades: { type: Number, required: true }
});

const Nacimiento = mongoose.model('nacimientos', nacimientoSchema, "nacimientos");

module.exports = Nacimiento;
