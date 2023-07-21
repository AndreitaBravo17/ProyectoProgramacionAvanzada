const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
  nombreCurso: { type: String, required: true },
  modalidad: { type: String, required: true },
  costo: { type: Number, required: true },
  horas: { type: Number, required: true },
  fechaInicio: { type: String, required: true }
});

const Cursos = mongoose.model('cursos', cursosSchema);

module.exports = Cursos;
