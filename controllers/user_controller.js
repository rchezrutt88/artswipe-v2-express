var passport = require('passport');

module.exports = {
    logout: logout,
    signup: signup,
    login: login,
    showLogin: showLogin,
    showProfile: showProfile,
    showSignup: showSignup
}

function login(req, res) {
    res.redirect('/');
}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function showLogin(req, res) {
    res.render('login', {message: req.flash('loginMessage')});
}

// TODO how to clean this up and implement passport as true middleware?
function signup(req, res, next) {
    res.redirect('/profile');
}

function showSignup(req, res) {
    res.render('signup', {message: req.flash('signupMessage')});
}

function showProfile(req, res) {
    res.render('profile');
}
