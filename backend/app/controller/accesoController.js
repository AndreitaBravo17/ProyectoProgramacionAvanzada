const Acceso = require('../models/accesoModel')
const { verifyPass } = require('../utils/handlePassword')
const { createToken } = require('../utils/handleToken')
const { ERROR_LOGIN_RESPONSE } = require('../utils/constants')

// Obtener todos los accesos
const obtenerAccesos = async (req, res) => {
  try {
    const accesos = await Acceso.find();
    res.json(accesos);
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al obtener los accesos.' });
  }
};

// Obtener un acceso por su ID
const obtenerAccesoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const acceso = await Acceso.findById(id);
    
    if (!acceso) {
      return res.status(404).json({ message: 'No se encontró el acceso.' });
    }

    res.json(acceso);
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al obtener el acceso.' });
  }
};

// Obtener un acceso por su email
const obtenerAcceso = async (req, res) => {
  const { email, clave } = req.body;

  try {
    const acceso = await Acceso.findOne({ email });
    if (!acceso) {
      return res.status(404).json({ message: 'No se encontró el acceso.' });
    }

    if (!verifyPass(clave, acceso.clave)) {
      return res.json(ERROR_LOGIN_RESPONSE);
    }

    const data = {
      nombre: acceso.nombre,
      email: acceso.email
    }
    const token = await createToken(data)
    return res.json({acceso: true, data: {data, token}});
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener el acceso.' });
  }
};

// Crear un nuevo acceso
const crearAcceso = async (req, res) => {
  const { nombre, email, clave } = req.body;
  
  try {
    const nuevoAcceso = new Acceso({
      nombre,
      email,
      clave
    });

    await nuevoAcceso.save();
    res.status(201).json({ message: 'Acceso creado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al crear el acceso.' });
  }
};

// Actualizar un acceso por su ID
const actualizarAcceso = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, clave } = req.body;

  try {
    const acceso = await Acceso.findById(id);
    
    if (!acceso) {
      return res.status(404).json({ message: 'No se encontró el acceso.' });
    }

    acceso.nombre = nombre;
    acceso.email = email;
    acceso.clave = clave;

    await acceso.save();
    res.json({ message: 'Acceso actualizado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al actualizar el acceso.' });
  }
};

// Eliminar un acceso por su ID
const eliminarAcceso = async (req, res) => {
  const { id } = req.params;

  try {
    const acceso = await Acceso.findByIdAndDelete(id);
    
    if (!acceso) {
      return res.status(404).json({ message: 'No se encontró el acceso.' });
    }

    res.json({ message: 'Acceso eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error al eliminar el acceso.' });
  }
};

module.exports = {
  obtenerAccesos,
  obtenerAccesoPorId,
  obtenerAcceso,
  crearAcceso,
  actualizarAcceso,
  eliminarAcceso
}
