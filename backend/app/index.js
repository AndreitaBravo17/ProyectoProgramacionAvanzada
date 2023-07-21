const express = require("express")
const db = require("./mongo/db")
const app = express()
const cors = require("cors")
const { router } = require("./routes/index")
const { corsOptions } = require("./utils/constants")

app.use(express.json())
app.use(cors(corsOptions))
app.use("/maternidad", router)
// Verificar si la conexión a MongoDB está activa
if (db.readyState !== 1) {
  console.log('Error: No se pudo establecer conexión a MongoDB');
} else {
  console.log('Conexión a MongoDB establecida');
}

module.exports = { app }