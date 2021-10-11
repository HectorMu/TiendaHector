const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

const controller = require('../controllers/adminController')

router.get('/admin',auth.isLoggedIn,auth.IsAdmin, controller.renderAdminDashboard)



module.exports = router