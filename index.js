const express = require("express")
const cors = require("cors")
const { connection } = require("./database/connection")
const user = require("./src/routes/user")

//* Conexion a la Base de db
connection()

const app = express()
const PORT = 3900

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", user)


app.listen(PORT, ()=>{ console.log(`SERVER RUNNING ON PORT ${PORT}`)})