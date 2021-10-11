const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()


const controller = require('../controllers/vendorController')

router.get('/vendor', auth.isLoggedIn, controller.renderVendorDashboard)



module.exports = router