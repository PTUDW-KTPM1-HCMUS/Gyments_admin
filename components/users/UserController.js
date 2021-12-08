const service = require('./UserService');
class UserController{
    //[GET] Account Page
    async showUserManagement(req,res){
        try{
            let currentPage = req.query.page || 1;
            let option = req.query.options || 'All';
            let username = req.query.username || '';
            const [accounts, activeAccounts, bannedAccounts, pages] = await service.getAccountList(currentPage, option, username, req.user);
            let previous = Math.ceil(parseInt(currentPage)-1)<1? 1:Math.ceil(parseInt(currentPage)-1);
            let next = Math.ceil(parseInt(currentPage)+1) > pages.length?pages.length: Math.ceil(parseInt(currentPage)+1);
            let length = true; // check if search for 1 user or multiple
            if (username.length != 0)
                length = false;
            res.render('users/views/management',{accounts, activeAccounts, bannedAccounts, pages, currentPage,previous,next, option, username, length});
        }catch (err){
            console.log({message: err});
        }
    }
    async getUserDetail(req, res){
        try{
            const detail = await service.showDetail(req.params.userID);
            res.render('users/views/account', {detail});
        }catch (err){
            console.log({message: err});
        }
    }
    getAddAccountPage(req, res){
        res.render('users/views/addAccount');
    }
    getProfilePage(req, res){
        res.render('users/views/profile');
    }
    // [POST] add new account
    async addAccount(req, res){
        try{
            const newAccount = await service.addAccount(req.body, req.file);
            res.render('users/views/addAccount', {newAccount});
        }catch (err){
            console.log({message: err});
        }
    }
}

module.exports = new UserController;