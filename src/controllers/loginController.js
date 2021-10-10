const passport = require('passport')
const helpers = require ('../helpers/helpers')
const controller = {}

controller.renderLogin = async(req, res)=>{
    try {
        await  helpers.initialState()
    } catch (error) {
        console.log(error)
    }
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