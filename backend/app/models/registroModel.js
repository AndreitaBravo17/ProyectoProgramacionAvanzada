const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  provincia: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  genero: { type: String, required: true },
  cursos: { type: mongoose.Schema.Types.ObjectId, ref: 'cursos', required: true }
});

const Registro = mongoose.model('registro', registroSchema);

module.exports = Registro;
