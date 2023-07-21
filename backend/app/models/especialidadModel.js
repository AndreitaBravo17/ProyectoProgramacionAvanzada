const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({
  especialidad: { type: String, required: true },
});

const Especialidad = mongoose.model('especialidades', especialidadSchema, 'especialidades');

module.exports = Especialidad;
