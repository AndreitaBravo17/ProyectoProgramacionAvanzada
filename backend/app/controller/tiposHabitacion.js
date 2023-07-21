const TipoHabitacion = require('../models/tipoHabitacionModel');

// Controlador para crear un nuevo tipo de habitación
const crearTipoHabitacion = (req, res) => {
  const { tipo } = req.body;

  const nuevoTipoHabitacion = new TipoHabitacion({
    tipo
  });

  nuevoTipoHabitacion
    .save()
    .then((tipoHabitacion) => {
      res.status(201).json(tipoHabitacion);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear el tipo de habitación' });
    });
};

// Controlador para obtener todos los tipos de habitación
const obtenerTodosTiposHabitacion = (req, res) => {
  TipoHabitacion.find()
    .then((tiposHabitacion) => {
      res.json(tiposHabitacion);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los tipos de habitación' });
    });
};

// Controlador para obtener un tipo de habitación por su ID
const obtenerTipoHabitacionPorId = (req, res) => {
  const { id } = req.params;

  TipoHabitacion.findById(id)
    .then((tipoHabitacion) => {
      if (!tipoHabitacion) {
        return res.status(404).json({ error: 'Tipo de habitación no encontrado' });
      }
      res.json(tipoHabitacion);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el tipo de habitación' });
    });
};

// Controlador para actualizar un tipo de habitación por su ID
const actualizarTipoHabitacion = (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  TipoHabitacion.findByIdAndUpdate(id, { tipo }, { new: true })
    .then((tipoHabitacion) => {
      if (!tipoHabitacion) {
        return res.status(404).json({ error: 'Tipo de habitación no encontrado' });
      }
      res.json(tipoHabitacion);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar el tipo de habitación' });
    });
};

// Controlador para eliminar un tipo de habitación por su ID
const eliminarTipoHabitacion = (req, res) => {
  const { id } = req.params;

  TipoHabitacion.findByIdAndRemove(id)
    .then((tipoHabitacion) => {
      if (!tipoHabitacion) {
        return res.status(404).json({ error: 'Tipo de habitación no encontrado' });
      }
      res.json({ message: 'Tipo de habitación eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el tipo de habitación' });
    });
};

module.exports = {
  crearTipoHabitacion,
  obtenerTodosTiposHabitacion,
  obtenerTipoHabitacionPorId,
  actualizarTipoHabitacion,
  eliminarTipoHabitacion
};
