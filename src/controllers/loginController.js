const passport = require('passport')
const controller = {}

controller.renderLogin = (req, res)=>{
    res.render('login')
}

controller.Login = passport.authenticate('local.login',{
    successRedirect:'/sales',
    failureRedirect:'/',
    failureFlash: true

})

controller.Logout = (req, res, next)=>{
    req.logOut();
    res.redirect('/')
}





module.exports = controller