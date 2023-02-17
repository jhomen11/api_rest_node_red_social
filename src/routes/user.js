const express = require('express')
const router = express.Router()
const {pruebaUser} = require('../controllers/user')

router.get('/prueba-user', pruebaUser)

module.exports = router