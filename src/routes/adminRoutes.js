const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

const controller = require('../controllers/adminController')

router.get('/admin',auth.isLoggedIn,auth.IsAdmin, controller.renderAdminDashboard)
router.get('/adminsales',auth.isLoggedIn,auth.IsAdmin, controller.renderAdminSalesView)



module.exports = router