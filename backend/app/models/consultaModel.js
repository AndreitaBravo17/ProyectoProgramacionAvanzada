const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'pacientes', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctores', required: true },
  sintomas: { type: String, required: true },
});

const Consulta = mongoose.model('consultas', consultaSchema);

module.exports = Consulta;
