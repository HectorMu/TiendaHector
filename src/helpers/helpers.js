const connection = require('../database')
const bcrypt = require('bcryptjs')
const helpers = {}

helpers.VerifyClientExistence = async (nombre) =>{
    const results = await connection.query(`select * from Clientes where Nombre = '${nombre}'`)
    console.log(results)
    return results.length > 0 ? true : false;
}

helpers.getClientId = async (nombre) =>{
    const results = await connection.query(`select IDCliente from Clientes where Nombre = '${nombre}'`)
    return results[0].IDCliente
}

helpers.encryptPass = async(pass)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass,salt)
    return hash
}

helpers.validatePass = async(pass, savedPass)=>{
    try{
            return await bcrypt.compare(pass, savedPass)
    }catch(e){
        console.log(e)
    }
}
helpers.initialState = async () =>{
    const superUser = await connection.query('select Permisos from Usuarios where Permisos = 2')
    if(!superUser.length){
        const firstAdmin = {
            Nombre: "HectorMuñoz",
            Contra:"",
            Permisos:2 
        }
        firstAdmin.Contra = await helpers.encryptPass(process.env.SUPERADMINPASS)
        await connection.query('insert into Usuarios set ?',[firstAdmin])
    }
}

module.exports = helpers;
