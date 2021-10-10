const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController');

router.get('/', controller.renderLogin)
router.post('/login', controller.Login)
router.get('/logout',controller.Logout)

module.exports = router