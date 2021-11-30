class UserController{
    //[GET] Account Page
    account(req,res){
        res.render('user/account');
    }

    
}

module.exports = new UserController;