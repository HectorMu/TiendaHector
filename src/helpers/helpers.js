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
helpers.formatDate = (date) =>{
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours-5 + ':' + minutes + ' ' + ampm;
    return strTime;
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
        firstAdmin.Contra = await helpers.encryptPass("Jose0209")
        await connection.query('insert into Usuarios set ?',[firstAdmin])
    }
}

module.exports = helpers;
