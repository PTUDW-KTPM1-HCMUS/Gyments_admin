const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const passport = require('../../utils/passport');
const guard = require('../../Middlewares/guard');

router.get('/login',AuthController.showLoginPage);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/account',
    failureRedirect: '/auth/login?wrongInf'
}));
router.get('/reset-password',AuthController.showResetPasswordPage);
router.get('/logout',guard,AuthController.logout);
module.exports = router;
