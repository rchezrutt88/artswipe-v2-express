var passport = require('passport');

module.exports = {
    signup: signup,
    login: login,
    showLogin: showLogin,
    showProfile: showProfile,
    showSignup: showSignup
}

function login(req, res) {
    passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res);
}

function showLogin(req, res) {
    res.render('login', {message: req.flash('loginMessage')});
}

// TODO how to clean this up and implement passport as true middleware?
function signup(req, res, next) {
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res, next);
}

function showSignup(req, res) {
    res.render('signup', {message: req.flash('signupMessage')});
}

function showProfile(req, res) {
    res.render('profile');
}
