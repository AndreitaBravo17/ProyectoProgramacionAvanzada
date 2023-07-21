const Doctor = require('../models/doctorModel');
const mongoose = require('mongoose')

// Controlador para crear un nuevo doctor
const crearDoctor = (req, res) => {
  const { cedula, nombre, especialidad, experiencia, telefono } = req.body;

  const nuevoDoctor = new Doctor({
    cedula,
    nombre,
    especialidad,
    experiencia,
    telefono,
  });

  Doctor.findOne({cedula})
  .then((doctor) => {
    if (doctor) {
      res.json({ error: 'Ya existe un doctor con esa cédula'});
    } else {
      nuevoDoctor
        .save()
        .then((doctor) => {
          res.status(201).json(doctor);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al crear el doctor' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para obtener todos los doctores
const obtenerTodosDoctores = (req, res) => {
  Doctor.find()
    .populate('especialidad', 'especialidad')
    .exec()
    .then((doctores) => {
      res.json(doctores);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los doctores' });
    });
};

// Controlador para obtener un doctor por su ID
const obtenerDoctorPorId = (req, res) => {
  const doctorId = req.params.id;

  Doctor.findById(doctorId)
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor no encontrado' });
      }
      res.json(doctor);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el doctor' });
    });
};

// Controlador para actualizar un doctor existente
const actualizarDoctor = (req, res) => {
  const doctorId = req.params.id;
  const { cedula, nombre, especialidad, experiencia, telefono } = req.body;

  Doctor.findOne({cedula})
  .then((doctor) => {
    if (doctor) {
      if(doctor._id.toString() !== doctorId) {
        res.json({ error: 'Ya existe un doctor con esa cédula'});
      } else {
        Doctor.findByIdAndUpdate(
          doctorId,
          { cedula, nombre, especialidad, experiencia, telefono },
          { new: true }
        )
          .then((doctor) => {
            res.json(doctor);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el doctor' });
          });
      }
    } else {
      Doctor.findByIdAndUpdate(
        doctorId,
        { cedula, nombre, especialidad, experiencia, telefono },
        { new: true }
      )
        .then((doctor) => {
          res.json(doctor);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al actualizar el doctor' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para eliminar un doctor existente
const eliminarDoctor = (req, res) => {
  const doctorId = req.params.id;

  Doctor.findByIdAndRemove(doctorId)
    .then(() => {
      res.json({ message: 'Doctor eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el doctor' });
    });
};

module.exports = {
  crearDoctor,
  obtenerTodosDoctores,
  obtenerDoctorPorId,
  actualizarDoctor,
  eliminarDoctor,
};
