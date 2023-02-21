const express = require('express')
const router = express.Router()
const {pruebaUser, crearUsuario} = require('../controllers/user')

router.get('/prueba-user', pruebaUser)
router.post('/user', crearUsuario)

module.exports = router