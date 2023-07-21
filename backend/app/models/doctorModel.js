const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  especialidad: { type: mongoose.Schema.Types.ObjectId, ref: 'especialidades', required: true },
  experiencia: { type: String, required: true },
  telefono: { type: String, required: true },
});

const Doctor = mongoose.model('doctores', doctorSchema);

module.exports = Doctor;
