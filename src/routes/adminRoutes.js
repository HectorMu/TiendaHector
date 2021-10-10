const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

const controller = require('../controllers/adminController');

router.get('/admin', auth.isLoggedIn,controller.renderAdminView)
router.post('/newuser',auth.isLoggedIn, controller.addNewUser)


module.exports = router