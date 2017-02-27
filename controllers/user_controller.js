var passport = require('passport');

module.exports = {
    signup: signup,
    login: login,
    showProfile: showProfile,
    showSignup: showSignup
}

function login(req, res) {
    res.render('login');
}

// TODO how to clean this up and implement passport as true middleware?
function signup(req, res) {
    res.send('whatever');
}

function showSignup(req, res) {
    res.render('signup', {message: req.flash('signupMessage')});
}

function showProfile(req, res) {
    res.render('profile')
}
