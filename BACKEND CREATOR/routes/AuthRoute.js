

const express = require('express')
const router = express.Router()

const verifierToken = require('../middlewares/authMiddleware')
const { login, monProfil } = require('../Controllers/AuthControllers')

router.post('/login', login)
router.get('/me', verifierToken, monProfil)

module.exports = router