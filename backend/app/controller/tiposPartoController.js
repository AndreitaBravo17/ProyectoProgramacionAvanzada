const TipoParto = require('../models/tipoPartoModel');

// Controlador para crear un nuevo tipo de parto
const crearTipoParto = (req, res) => {
  const { tipo } = req.body;

  const nuevoTipoParto = new TipoParto({
    tipo
  });

  nuevoTipoParto
    .save()
    .then((tipoParto) => {
      res.status(201).json(tipoParto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear el tipo de parto' });
    });
};

// Controlador para obtener todos los tipos de parto
const obtenerTodosTiposParto = (req, res) => {
  TipoParto.find()
    .then((tiposParto) => {
      res.json(tiposParto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los tipos de parto' });
    });
};

// Controlador para obtener un tipo de parto por su ID
const obtenerTipoPartoPorId = (req, res) => {
  const tipoPartoId = req.params.id;

  TipoParto.findById(tipoPartoId)
    .then((tipoParto) => {
      if (!tipoParto) {
        return res.status(404).json({ error: 'Tipo de parto no encontrado' });
      }
      res.json(tipoParto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el tipo de parto' });
    });
};

// Controlador para actualizar un tipo de parto existente
const actualizarTipoParto = (req, res) => {
  const tipoPartoId = req.params.id;
  const { tipo } = req.body;

  TipoParto.findByIdAndUpdate(
    tipoPartoId,
    { tipo },
    { new: true }
  )
    .then((tipoParto) => {
      res.json(tipoParto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar el tipo de parto' });
    });
};

// Controlador para eliminar un tipo de parto existente
const eliminarTipoParto = (req, res) => {
  const tipoPartoId = req.params.id;

  TipoParto.findByIdAndRemove(tipoPartoId)
    .then(() => {
      res.json({ message: 'Tipo de parto eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el tipo de parto' });
    });
};

module.exports = {
  crearTipoParto,
  obtenerTodosTiposParto,
  obtenerTipoPartoPorId,
  actualizarTipoParto,
  eliminarTipoParto,
};
