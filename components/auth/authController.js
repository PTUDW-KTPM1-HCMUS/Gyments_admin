const service = require('../users/UserService');
class AuthController{

    async showLoginPage(req,res){
        const wrongInf = req.query['wrongInf'] !== undefined;
        console.log(wrongInf);
        res.render('auth/views/login',{wrongInf, layout : false});
    }

    async showResetPasswordPage(req,res){
        res.render('auth/views/reset-password', {layout : false});
    }

    async logout(req,res){
        await req.logout();
        res.redirect('/auth/login');
    }
}

module.exports = new AuthController;