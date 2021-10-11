const passport = require('passport')
const helpers = require ('../helpers/helpers')
const controller = {}

controller.renderLogin = async(req, res)=>{
    res.render('login')
}
controller.Login =(req, res, next) =>{
    passport.authenticate('local.login',(err, user)=>{
        console.log(user)
        if(!user){
            return res.redirect('/')
        }
        req.logIn(user,(err)=>{
            if(req.user.Permisos == 1){
                return res.redirect('/admin')
            }else{
                return res.redirect('/vendor')
            }
        })
    })(req, res, next)
}


// controller.Login = passport.authenticate('local.login',{
//     successRedirect:'/sales',
//     failureRedirect:'/',
//     failureFlash: true

// })

controller.Logout = (req, res, next)=>{
    req.logOut();
    res.redirect('/')
}





module.exports = controller