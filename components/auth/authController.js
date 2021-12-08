
class AuthController{

    async showLoginPage(req,res){
        const invalid = req.query['invalid'] !== undefined;
        if (invalid){
            res.render('auth/views/login',{invalid, layout : false});
            return;
        }
        const banned = req.query['banned'] !== undefined;
        if (banned){
            res.render('auth/views/login',{banned, layout : false});
            return;
        }
        const denied = req.query['denied'] !== undefined;
        if (denied){
            res.render('auth/views/login',{denied, layout : false});
            return;
        }
        res.render('auth/views/login',{layout : false});
    }

    async showResetPasswordPage(req,res){
        res.render('auth/views/reset-password', {layout : false});
    }

    async logout(req,res){
        await req.logout();
        res.redirect('/auth/login');
    }
    async check(req,res,user){
        if(user.status==false){
            return res.redirect('/auth/login?banned');
        }
        if(user.userType==false){
            return res.redirect('/auth/login?denied');
        }
        if(!user)
        {
            return res.redirect('/auth/login?invalid');
        }
        req.logIn(user, function(err){
            if(err)return next(err);
            // success login
            return res.redirect('/');
        })
    }
}

module.exports = new AuthController;