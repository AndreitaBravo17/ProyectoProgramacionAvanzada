const Habitacion = require('../models/habitacionModel');

// Controlador para crear una nueva habitación
const crearHabitacion = (req, res) => {
  const { numero, tipo, disponibilidad, costoDiario, equipamento } = req.body;

  const nuevaHabitacion = new Habitacion({
    numero,
    tipo,
    disponibilidad,
    costoDiario,
    equipamento
  });

  Habitacion.findOne({numero})
  .then((habitacion) => {
    if (habitacion) {
      res.json({ error: 'Ya existe ese número de habitacion'});
    } else {
      nuevaHabitacion
      .save()
      .then((habitacion) => {
        res.status(201).json(habitacion);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al crear la habitación' });
      });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de habitación existente' });
  });
};

// Controlador para obtener todas las habitaciones
const obtenerTodasHabitaciones = (req, res) => {
  Habitacion.find()
    .populate("tipo", "tipo")
    .exec()
    .then((habitaciones) => {
      res.json(habitaciones);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener las habitaciones' });
    });
};

// Controlador para obtener una habitación por su ID
const obtenerHabitacionPorId = (req, res) => {
  const habitacionId = req.params.id;

  Habitacion.findById(habitacionId)
    .then((habitacion) => {
      if (habitacion) {
        res.json(habitacion);
      } else {
        res.status(404).json({ error: 'Habitación no encontrada' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la habitación' });
    });
};

// Controlador para actualizar una habitación
const actualizarHabitacion = (req, res) => {
  const habitacionId = req.params.id;
  const { numero, tipo, disponibilidad, costoDiario, equipamento } = req.body;

  Habitacion.findOne({numero})
  .then((habitacion) => {
    if (habitacion) {
      if(habitacion._id.toString() !== habitacionId) {
        res.json({ error: 'Ya existe ese número de habitacion'});

      }else{
        Habitacion.findByIdAndUpdate(
          habitacionId,
          {
            numero,
            tipo,
            disponibilidad,
            costoDiario,
            equipamento
          },
          { new: true }
        )
          .then((habitacion) => {
            if (habitacion) {
              res.json(habitacion);
            } else {
              res.status(404).json({ error: 'Habitación no encontrada' });
            }
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar la habitación' });
          });
      }
    } else {
      Habitacion.findByIdAndUpdate(
        habitacionId,
        {
          numero,
          tipo,
          disponibilidad,
          costoDiario,
          equipamento
        },
        { new: true }
      )
        .then((habitacion) => {
          if (habitacion) {
            res.json(habitacion);
          } else {
            res.status(404).json({ error: 'Habitación no encontrada' });
          }
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al actualizar la habitación' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de habitación existente' });
  });
};

// Controlador para eliminar una habitación
const eliminarHabitacion = (req, res) => {
  const habitacionId = req.params.id;

  Habitacion.findByIdAndRemove(habitacionId)
    .then((habitacion) => {
      if (habitacion) {
        res.json({ message: 'Habitación eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Habitación no encontrada' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar la habitación' });
    });
};

module.exports = {
  crearHabitacion,
  obtenerTodasHabitaciones,
  obtenerHabitacionPorId,
  actualizarHabitacion,
  eliminarHabitacion
};
