const connection = require('../database')
const helpers = require ('../helpers/helpers')
const controller = {}

controller.renderUsersView = async(req, res)=>{
    const users = await connection.query('select * from Usuarios')
    res.render('users',{users})
}

controller.addNewUser = async (req, res)=>{
    const {Nombre, Contra, Permisos} = req.body
    const newUser = {
        Nombre,
        Contra,
        Permisos
    }
    newUser.Contra = await helpers.encryptPass(Contra)
    await connection.query('insert into Usuarios set ?',[newUser])
    res.redirect('/users')
}


module.exports = controller;