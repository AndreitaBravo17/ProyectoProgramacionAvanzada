
  const express = require('express');
const mongoose = require('mongoose');
const cursosController = require("../controller/cursosController");
const registroController = require("../controller/registroController");

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

const uri ="mongodb+srv://daig:daig123456@bdregistro.rqh5apz.mongodb.net/academia"; // Lee la URI de conexión desde las variables de entorno

const app = express();
const port = 3000;

mongoose.set('strictQuery', false);

// Conexión a MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB - ATLAS'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Toda la configuración de la base de datos se encuentra en el archivo .env
const dbConnection = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la DB. Ver logs.");
  }
};

module.exports = {
  dbConnection,
};
