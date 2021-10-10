const connection = require('../database')
const helpers = require ('../helpers/helpers')
let dateObject = new Date()
let saleDate = (dateObject.getDate()+"/"+"0"+dateObject.getMonth()+"/"+dateObject.getFullYear() +" "+helpers.formatDate(dateObject))
const controller = {}

controller.renderSalesView = async(req, res)=>{
    const allSales = await connection.query('SELECT cl.IDCliente,cl.Nombre, SUM(co.Cantidad) AS Total FROM Compras co, Clientes cl WHERE co.FkCliente = cl.IDCliente GROUP BY co.FkCliente;')
    res.render('sales',{
        allSales
    })
}
controller.saveSale = async(req, res)=>{
    const {Nombre, Cantidad} = req.body
  
    //if the client is already registered
    if(await helpers.VerifyClientExistence(Nombre)){
        const gettedID = await helpers.getClientId(Nombre)
        const newSale = {
            Cantidad,
            FkCliente: gettedID,
            Fecha: saleDate
        }
        await connection.query('insert into Compras set ?',[newSale])
        req.flash("success_msg",`Guardado, el cliente ${Nombre} suma ${Cantidad} pesos`)
        res.redirect('/sales')
    }else{
        //if the client is not registered
        await connection.query(`insert into Clientes values (null, '${Nombre}')`)
        const gettedID = await helpers.getClientId(Nombre)
        const newSale = {
            Cantidad,
            FkCliente: gettedID,
            Fecha:saleDate
        }
        await connection.query('insert into Compras set ?',[newSale])
        req.flash("success_msg",`Guardado, cliente ${Nombre} registrado, inicia con ${Cantidad} pesos`)
        res.redirect('/sales')
    }
}

// controller.deleteAllClientData = async(req, res)=>{
//     const {IDCliente} = req.params;
//     await connection.query(`delete from compras where FkCliente = ${IDCliente}`)
//     await connection.query(`delete from clientes where IDCliente = ${IDCliente}`)
//     res.redirect('/sales')
// }


controller.renderByClientSalesView = async(req, res)=>{
    const {IDCliente}= req.params;
    const clientSales = await connection.query(`select * from Compras where FkCliente =  ${IDCliente} ORDER BY IDCompra DESC`)
    const clientName = await connection.query(`select Nombre from Clientes where IDCliente = ${IDCliente}`)
    res.render('salesbyclient',{clientSales,clientName})
}
controller.deleteClientSale = async (req, res)=>{
    const {IDCompra}= req.params
    await connection.query(`delete from Compras where IDCompra = ${IDCompra}`)
    req.flash("success_msg",`Compra eliminada`)
    res.redirect('/sales')
}

controller.editClientSale = async(req, res)=>{
    const {IDCompra}= req.params;
    const {Cantidad} = req.body
    await connection.query(`update Compras set Cantidad = ${Cantidad} where IDCompra = ${IDCompra}`)
    req.flash("success_msg",`Cantidad de la compra corregida`)
    res.redirect('/sales')
}







module.exports = controller;