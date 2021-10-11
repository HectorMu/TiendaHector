const auth = {}

auth.isLoggedIn =(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','Debes iniciar sesion para acceder a esta vista');
        res.redirect('/');
    }
}

auth.IsAdmin = (req, res, next)=>{
   if(req.user.Permisos == 1){
       return next()
   }
   return res.redirect('/sales')
}

module.exports = auth