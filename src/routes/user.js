const express = require('express')
const router = express.Router()
const {pruebaUser, crearUsuario, loginUsuario} = require('../controllers/user')

router.get('/prueba-user', pruebaUser)
router.get('/login', loginUsuario)
router.post('/user', crearUsuario)

module.exports = router