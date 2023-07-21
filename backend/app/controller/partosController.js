const Parto = require('../models/partoModel');

// Controlador para crear un nuevo parto
const crearParto = (req, res) => {
  const { fecha, hora, paciente, doctor, tipoParto, pesoBebe } = req.body;

  const nuevoParto = new Parto({
    fecha,
    hora,
    paciente,
    doctor,
    tipoParto,
    pesoBebe
  });

  nuevoParto
    .save()
    .then((parto) => {
      res.status(201).json(parto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear el parto' });
    });
};

// Controlador para obtener todos los partos
const obtenerTodosPartos = (req, res) => {
  Parto.find()
    .populate("paciente", "nombre")
    .populate("doctor", "nombre")
    .populate("tipoParto", "tipo")
    .exec()
    .then((partos) => {
      res.json(partos);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los partos' });
    });
};

// Controlador para obtener un parto por su ID
const obtenerPartoPorId = (req, res) => {
  const partoId = req.params.id;

  Parto.findById(partoId)
    .then((parto) => {
      if (!parto) {
        return res.status(404).json({ error: 'Parto no encontrado' });
      }
      res.json(parto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el parto' });
    });
};

// Controlador para actualizar un parto existente
const actualizarParto = (req, res) => {
  const partoId = req.params.id;
  const { fecha, hora, paciente, doctor, tipoParto, pesoBebe } = req.body;

  Parto.findByIdAndUpdate(
    partoId,
    { fecha, hora, paciente, doctor, tipoParto, pesoBebe },
    { new: true }
  )
    .then((parto) => {
      res.json(parto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar el parto' });
    });
};

// Controlador para eliminar un parto existente
const eliminarParto = (req, res) => {
  const partoId = req.params.id;

  Parto.findByIdAndRemove(partoId)
    .then(() => {
      res.json({ message: 'Parto eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el parto' });
    });
};

module.exports = {
  crearParto,
  obtenerTodosPartos,
  obtenerPartoPorId,
  actualizarParto,
  eliminarParto,
};
