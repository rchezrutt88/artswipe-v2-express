/**
 * Created by rdrutt on 2/17/17.
 */
const express = require('express'),
    router = express.Router(),
    appController = require('./controllers/app_controller.js'),
    artsController = require('./controllers/arts_controller.js'),
    userController = require('./controllers/user_controller'),
    passport = require('passport');

module.exports = router;


/**
 * Checks for user on every call and ensures placement in template
 */
router.use(function (req, res, next) {
    if (req.user) res.locals.user = req.user;
    next();
});

router.get('/', appController.showHome);

/*User Routes*/

router.get('/signup', userController.showSignup);

router.post('/signup',
    passport.authenticate('local-signup', {failureFlash: true, failureRedirect: '/signup'}),
    userController.signup);

router.get('/login', userController.showLogin);

router.post('/login',
    passport.authenticate('local-login', {failureFlash: true, failureRedirect: '/login'}),
    userController.login);

router.get('/signout', userController.signout);

router.get('/profile', userController.showProfile);

router.get('/arts', artsController.showArts);

router.get('/arts/create', artsController.showCreate);

router.get('/arts/create/get-signed-request', artsController.processCreate,
    artsController.getSignedRequest);

router.get('/arts/:slug', artsController.showSingle);

