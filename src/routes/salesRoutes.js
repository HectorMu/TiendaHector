const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

const controller = require('../controllers/salesController');

router.get('/sales', auth.isLoggedIn, controller.renderSalesView)
router.post('/newsale',auth.isLoggedIn, controller.saveSale)
router.get('/clientsales/:IDCliente',auth.isLoggedIn,controller.renderByClientSalesView)
router.get('/deleteSale/:IDCompra',auth.isLoggedIn,controller.deleteClientSale)
router.post('/editsale/:IDCompra',auth.isLoggedIn,controller.editClientSale)



module.exports = router