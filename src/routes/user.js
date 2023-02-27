const express = require('express')
const router = express.Router()
const {pruebaUser, crearUsuario, loginUsuario} = require('../controllers/user')
const { auth } = require('../middleware/auth')

router.get('/prueba-user', auth ,pruebaUser)
router.get('/login', loginUsuario)
router.post('/user', crearUsuario)

module.exports = router