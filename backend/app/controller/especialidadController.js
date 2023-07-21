const Especialidad = require('../models/especialidadModel');

const obtenerEspecialidades = (req, res) => {
  Especialidad.find()
    .then((especialidades) => {
      res.json(especialidades);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener las especialidades' });
    });
};

module.exports = {
  obtenerEspecialidades,
};
