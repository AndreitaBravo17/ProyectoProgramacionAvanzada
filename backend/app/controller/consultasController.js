const Consulta = require('../models/consultaModel');
const obtenerConsultas = (req, res) => {
  Consulta.find()
    .populate('paciente', 'nombre')
    .populate('doctor', 'nombre')
    .exec()
    .then((consultas) => {
      res.json(consultas);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener las consultas' });
    });
};

const agregarConsulta = (req, res) => {
  const { fecha, hora, paciente, doctor, sintomas } = req.body;

  const nuevaConsulta = new Consulta({
    fecha,
    hora,
    paciente,
    doctor,
    sintomas,
  });

  nuevaConsulta
    .save()
    .then((consulta) => {
      res.status(201).json(consulta);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al agregar la consulta' });
    });
};

const modificarConsulta = (req, res) => {
  const consultaId = req.params.id;
  const { fecha, hora, paciente, doctor, sintomas } = req.body;

  Consulta.findByIdAndUpdate(
    consultaId,
    { fecha, hora, paciente, doctor, sintomas },
    { new: true }
  )
    .then((consulta) => {
      res.json(consulta);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al modificar la consulta' });
    });
};

const eliminarConsulta = (req, res) => {
  const consultaId = req.params.id;

  Consulta.findByIdAndRemove(consultaId)
    .then(() => {
      res.json({ message: 'Consulta eliminada correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar la consulta' });
    });
};

const obtenerConsultaPorId = (req, res) => {
  const consultaId = req.params.id;

  Consulta.findById(consultaId)
    .exec()
    .then((consulta) => {
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta no encontrada' });
      }
      res.json(consulta);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la consulta' });
    });
};

module.exports = {
  obtenerConsultas,
  agregarConsulta,
  modificarConsulta,
  eliminarConsulta,
  obtenerConsultaPorId,
};
