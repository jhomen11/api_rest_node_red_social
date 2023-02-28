const express = require('express')
const router = express.Router()
const {pruebaUser, crearUsuario, loginUsuario, userProfile, usersList} = require('../controllers/user')
const { auth } = require('../middleware/auth')

router.get('/prueba-user', auth ,pruebaUser)
router.get('/user/profile/:id', auth, userProfile)
router.get('/user/list/:page?', auth, usersList)
router.get('/login', loginUsuario)
router.post('/user', crearUsuario)

module.exports = router