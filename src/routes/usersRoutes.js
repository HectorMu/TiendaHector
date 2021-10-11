const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()


const controller = require('../controllers/usersController');

router.get('/users', auth.isLoggedIn, auth.IsAdmin, controller.renderUsersView)
router.post('/newuser',auth.isLoggedIn, auth.IsAdmin, controller.addNewUser)


module.exports = router