const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const userService = require('../components/users/UserService');

passport.use(new LocalStrategy(
    {
        usernameField: 'signin-username',
        passwordField: 'signin-password'
    },
    async function(username, password, done) {
        const user = await userService.findByUsername(username);
        if (!user){
            console.log("Username does not exist!");
            return done(null, false,{message:'Username does not exist!'});
        }
        if (!await userService.validPassword(password, user)) {
            console.log("Incorrect password!");
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    })
);


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    done(null, user);
});

module.exports = passport;