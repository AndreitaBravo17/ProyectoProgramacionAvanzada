const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId, ref: 'tipos_habitaciones',
    required: true
  },
  disponibilidad: {
    type: Number,
    required: true
  },
  costoDiario: {
    type: Number,
    required: true
  },
  equipamento: {
    type: String,
    required: true
  }
});

const Habitacion = mongoose.model('habitaciones', habitacionSchema, 'habitaciones');

module.exports = Habitacion;
