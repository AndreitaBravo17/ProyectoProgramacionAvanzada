const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
});

const Paciente = mongoose.model('pacientes', pacienteSchema);

module.exports = Paciente;
