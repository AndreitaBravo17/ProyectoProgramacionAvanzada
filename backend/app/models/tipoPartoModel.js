const mongoose = require('mongoose');

const tipoPartoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  }
});

const TipoParto = mongoose.model("tipos_parto", tipoPartoSchema, "tipos_parto");

module.exports = TipoParto;
