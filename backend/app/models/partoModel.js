const mongoose = require('mongoose');

const partoSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pacientes',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctores',
    required: true
  },
  tipoParto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tipos_parto',
    required: true
  },
  pesoBebe: {
    type: Number,
    required: true
  }
});

const Parto = mongoose.model('partos', partoSchema, "partos");

module.exports = Parto;
