const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')

passport.use('local.login', new passportLocal({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const rows = await connection.query('select * from usuarios where Nombre = ?',[username])
    if(rows.length> 0){
        const user = rows[0]
        if(await helpers.validatePass(password,user.Contra)){
            done(null, user)
        }else{
            done(null, false,req.flash("error_msg", "Contraseña incorrecta"))
        }
    }else{
        return done(null, false,req.flash("error_msg", "El usuario no existe"))
    }
}))

passport.serializeUser((user,done)=>{
    done(null, user.IDUsuario)
})

passport.deserializeUser(async(id, done)=>{
    const rows = await connection.query('select * from usuarios where IDUsuario = ?',[id])
    done(null, rows[0])
})