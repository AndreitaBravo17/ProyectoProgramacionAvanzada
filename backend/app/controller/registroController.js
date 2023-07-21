const Registro = require('../models/registroModel');

// Controlador para crear un nuevo paciente
const crearRegistro = (req, res) => {
  const { cedula, nombres, apellidos, provincia, edad, telefono, correo, genero,cursos } = req.body;

  const nuevoRegistro = new Registro({
    cedula, 
    nombres, 
    apellidos, 
    provincia, 
    edad, 
    telefono, 
    correo, 
    genero,
    cursos
  });

  Registro.findOne({cedula})
  .then((registro) => {
    if (registro) {
      res.json({ error: 'Ya existe un registro con esa cédula'});
    } else {
      nuevoRegistro
        .save()
        .then((registro) => {
          res.status(201).json(registro);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al crear el registro' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para obtener todos los registro
const obtenerTodosRegistro = (req, res) => {
    Registro.find()
    .then((registro) => {
      res.json(registro);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los registros' });
    });
};

// Controlador para obtener un registro por su ID
const obtenerRegistroPorId = (req, res) => {
  const registroId = req.params.id;

  Registro.findById(registroId)
    .then((registro) => {
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.json(registro);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el registro' });
    });
};

// Controlador para actualizar un registro existente
const actualizarRegistro = (req, res) => {
  const registroId = req.params.id;
  const { cedula, nombres, apellidos, provincia, edad, telefono, correo, genero, cursos } = req.body;

  Registro.findOne({cedula})
  .then((registro) => {
    if (registro) {
      if(registro._id.toString() !== registroId) {
        res.json({ error: 'Ya existe un registro con esa cédula'});
      } else {
        Registro.findByIdAndUpdate(
          registroId,
          { cedula, nombres, apellidos, provincia, edad, telefono, correo, genero, cursos  },
          { new: true }
        )
          .then((registro) => {
            res.json(registro);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el registro' });
          });
      }
    } else {
        Registro.findByIdAndUpdate(
          registroId,
        { cedula, nombres, apellidos, provincia, edad, telefono, correo, genero, cursos  },
        { new: true }
      )
        .then((registro) => {
          res.json(registro);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error al actualizar el registro' });
        });
    }
  }).catch((error) => {
    return res.status(500).json({ error: 'Error al buscar numero de cédula existente' });
  });
};

// Controlador para eliminar un paciente existente
const eliminarRegistro = (req, res) => {
  const registroId = req.params.id;

  Registro.findByIdAndRemove(registroId)
    .then(() => {
      res.json({ message: 'Registro eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el registro' });
    });
};

module.exports = {
  crearRegistro,
  obtenerTodosRegistro,
  obtenerRegistroPorId,
  actualizarRegistro,
  eliminarRegistro,
};

