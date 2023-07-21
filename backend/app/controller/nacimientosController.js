const Nacimiento = require('../models/nacimientoModel');

// Obtener todos los nacimientos
const obtenerNacimientos = async (req, res) => {
  try {
    const nacimientos = await Nacimiento.find();
    res.json(nacimientos);
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al obtener los nacimientos.' });
  }
};

// Obtener un nacimiento por su ID
const obtenerNacimientoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const nacimiento = await Nacimiento.findById(id);
    
    if (!nacimiento) {
      return res.status(404).json({ message: 'No se encontró el nacimiento.' });
    }

    res.json(nacimiento);
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al obtener el nacimiento.' });
  }
};

// Crear un nuevo nacimiento
const crearNacimiento = async (req, res) => {
  console.log(req.body);
  const { nombre, fecha, peso, genero, enfermedades } = req.body;
  
  try {
    const nuevoNacimiento = new Nacimiento({
      nombre,
      fecha,
      peso,
      genero,
      enfermedades
    });

    await nuevoNacimiento.save();
    res.status(201).json({ message: 'Nacimiento creado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al crear el nacimiento.' });
  }
};

// Actualizar un nacimiento por su ID
const actualizarNacimiento = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, peso, genero, enfermedades } = req.body;

  try {
    const nacimiento = await Nacimiento.findById(id);
    
    if (!nacimiento) {
      return res.status(404).json({ message: 'No se encontró el nacimiento.' });
    }

    nacimiento.nombre = nombre;
    nacimiento.fecha = fecha;
    nacimiento.peso = peso;
    nacimiento.genero = genero;
    nacimiento.enfermedades = enfermedades;

    await nacimiento.save();
    res.json({ message: 'Nacimiento actualizado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al actualizar el nacimiento.' });
  }
};

// Eliminar un nacimiento por su ID
const eliminarNacimiento = async (req, res) => {
  const { id } = req.params;

  try {
    const nacimiento = await Nacimiento.findByIdAndDelete(id);
    
    if (!nacimiento) {
      return res.status(404).json({ message: 'No se encontró el nacimiento.' });
    }

    res.json({ message: 'Nacimiento eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al eliminar el nacimiento.' });
  }
};

module.exports = {
  obtenerNacimientos,
  obtenerNacimientoPorId,
  crearNacimiento,
  actualizarNacimiento,
  eliminarNacimiento
};
