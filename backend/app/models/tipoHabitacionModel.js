const mongoose = require('mongoose');

const tipoHabitacionSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  }
});

const TipoHabitacion = mongoose.model('tipos_habitaciones', tipoHabitacionSchema, 'tipos_habitaciones');

module.exports = TipoHabitacion;
