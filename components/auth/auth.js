const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const passport = require('../../utils/passport');
const guard = require('../../Middlewares/guard');

router.get('/login',AuthController.showLoginPage);
router.post('/login',function(req,res,next) {
    passport.authenticate('local',function(err,user){
        if(err){
            return next(err);
        }
        AuthController.check(req,res,user);
    })(req,res,next);
})


router.get('/reset-password',AuthController.showResetPasswordPage);
router.get('/logout',guard,AuthController.logout);
module.exports = router;
