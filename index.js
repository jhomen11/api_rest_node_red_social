const express = require("express")
const { connection } = require("./database/connection")

//* Conexion a la Base de db
connection()