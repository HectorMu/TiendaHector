const connection = require('../database')
const controller = {}


controller.renderAdminDashboard = (req, res)=>{
    res.render('adminDashboard')
} 

controller.renderAdminSalesView = async(req, res)=>{
    const sales = await connection.query('select * from Compras ORDER BY IDCompra DESC')
    const allSalesSum = await connection.query('SELECT SUM(Cantidad) as Total FROM compras')
    const startDate = await connection.query('SELECT Fecha FROM Compras ORDER BY IDCompra ASC LIMIT 1')
    const endDate = await connection.query('SELECT Fecha  FROM Compras ORDER BY IDCompra DESC LIMIT 1')
    res.render('adminSales',{
        sales,
        Total:allSalesSum[0].Total,
        startDate: startDate[0].Fecha,
        endDate: endDate[0].Fecha
    })
    
}




module.exports = controller;