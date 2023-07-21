const Paciente = require('../models/pacienteModel');

// Controlador para crear un nuevo paciente
const crearPaciente = (req, res) => {
  const { cedula, nombre, direccion, edad, telefono } = req.body;

  const nuevoPaciente = new Paciente({
    cedula,
    nombre,
    direccion,
    edad,
    telefono,
  });

  Paciente.findOne({cedula})
  .then((paciente) => {
    if (paciente) {
      res.json({ error: 'Ya existe un paciente con esa cédula'});
    } else {
      nuevoPaciente
        .save()
        .then((paciente) => {
          res.status(201).json(paciente);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al crear el paciente' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para obtener todos los pacientes
const obtenerTodosPacientes = (req, res) => {
  Paciente.find()
    .then((pacientes) => {
      res.json(pacientes);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los pacientes' });
    });
};

// Controlador para obtener un paciente por su ID
const obtenerPacientePorId = (req, res) => {
  const pacienteId = req.params.id;

  Paciente.findById(pacienteId)
    .then((paciente) => {
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.json(paciente);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el paciente' });
    });
};

// Controlador para actualizar un paciente existente
const actualizarPaciente = (req, res) => {
  const pacienteId = req.params.id;
  const { cedula, nombre, direccion, edad, telefono } = req.body;

  Paciente.findOne({cedula})
  .then((paciente) => {
    if (paciente) {
      if(paciente._id.toString() !== pacienteId) {
        res.json({ error: 'Ya existe un paciente con esa cédula'});
      } else {
        Paciente.findByIdAndUpdate(
          pacienteId,
          { cedula, nombre, direccion, edad, telefono },
          { new: true }
        )
          .then((paciente) => {
            res.json(paciente);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el paciente' });
          });
      }
    } else {
      Paciente.findByIdAndUpdate(
        pacienteId,
        { cedula, nombre, direccion, edad, telefono },
        { new: true }
      )
        .then((paciente) => {
          res.json(paciente);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al actualizar el paciente' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para eliminar un paciente existente
const eliminarPaciente = (req, res) => {
  const pacienteId = req.params.id;

  Paciente.findByIdAndRemove(pacienteId)
    .then(() => {
      res.json({ message: 'Paciente eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el paciente' });
    });
};

module.exports = {
  crearPaciente,
  obtenerTodosPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
};

