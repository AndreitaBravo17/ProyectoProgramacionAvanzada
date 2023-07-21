const Cursos = require('../models/cursosModel');

// Controlador para crear un nuevo paciente
const crearCursos = (req, res) => {
  const { nombreCurso, modalidad, costo, horas, fechaInicio } = req.body;

  const nuevoCursos = new Cursos({
    nombreCurso,
     modalidad, 
     costo, 
     horas, 
     fechaInicio
  });

  Cursos.findOne({nombreCurso})
  .then((cursos) => {
    if (cursos) {
      res.json({ error: 'Ya existe un curso con ese nombre'});
    } else {
      nuevoCursos
        .save()
        .then((cursos) => {
          res.status(201).json(cursos);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al crear el curso' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar nombre del curso existente' });
  });
};

// Controlador para obtener todos los cursos
const obtenerTodosCursos = (req, res) => {
    Cursos.find()
    .then((cursos) => {
      res.json(cursos);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los cursos' });
    });
};

// Controlador para obtener un paciente por su ID
const obtenerCursosPorId = (req, res) => {
  const cursosId = req.params.id;

  Cursos.findById(cursosId)
    .then((cursos) => {
      if (!cursos) {
        return res.status(404).json({ error: 'Cursos no encontrado' });
      }
      res.json(cursos);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el paciente' });
    });
};

// Controlador para actualizar un paciente existente
const actualizarCursos = (req, res) => {
  const cursosId = req.params.id;
  const {nombreCurso, modalidad, costo, horas, fechaInicio} = req.body;

  Cursos.findOne({nombreCurso})
  .then((cursos) => {
    if (cursos) {
      if(cursos._id.toString() !== cursosId) {
        res.json({ error: 'Ya existe un curso con ese nombre'});
      } else {
        Cursos.findByIdAndUpdate(
            cursosId,
          {nombreCurso, modalidad, costo, horas, fechaInicio},
          { new: true }
        )
          .then((cursos) => {
            res.json(cursos);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el curso' });
          });
      }
    } else {
        Cursos.findByIdAndUpdate(
            cursosId,
        {nombreCurso, modalidad, costo, horas, fechaInicio},
        { new: true }
      )
        .then((cursos) => {
          res.json(cursos);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al actualizar el curso' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar nombre del curso existente' });
  });
};

// Controlador para eliminar un paciente existente
const eliminarCursos = (req, res) => {
  const cursosId = req.params.id;

  Cursos.findByIdAndRemove(cursosId)
    .then(() => {
      res.json({ message: 'Curso eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el curso' });
    });
};

module.exports = {
  crearCursos,
  obtenerTodosCursos,
  obtenerCursosPorId,
  actualizarCursos,
  eliminarCursos,
};

