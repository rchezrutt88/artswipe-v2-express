var passport = require('passport');

module.exports = {
    signup: signup,
    login: login,
    showProfile: showProfile,
    showSignup: showSignup
}

function login(req, res) {
    res.render('signin');
}

function signup(req, res) {
    console.log('hits signup');
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res);
}

function showSignup(req, res) {
    res.render('signup', {message: req.flash('signupMessage')});
}

function showProfile(req, res) {
    res.render('profile')
}