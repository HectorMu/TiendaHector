require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const flash = require('connect-flash') 
const session = require('express-session')
const mySqlSessionStore = require('express-mysql-session')(session)
const morgan = require('morgan')
const passport = require('passport')
const helpers = require('./helpers/helpers')
require('./lib/passport')
const app = express()

//using middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
//configuracion para guardar la sessiones
let options ={
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store: new mySqlSessionStore(options)
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//global variables for messages
app.use((req, res, next) => {
    app.locals.success_msg = req.flash("success_msg")
    app.locals.error_msg = req.flash("error_msg")
    app.locals.error = req.flash("error")
     //global variable for get the user
     app.locals.user = req.user || null
     next()
   });
//using the routes
app.use('/',require("./routes/indexRoutes.js"))
app.use('/',require('./routes/salesRoutes'))
app.use('/',require('./routes/loginRoutes'))
app.use('/',require('./routes/adminRoutes'))

helpers.initialState()
 

//static files (css, html, js, media resources)
app.use(express.static(path.join(__dirname,"public")))

//initialazing the server
let port = process.env.PORT || 4000
app.listen(port,()=>{
console.log('Server started on port', port)
}) 
