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

router.get('/profile', userController.showProfile);

router.get('/arts', artsController.showArts);

router.get('/arts/seed', artsController.seedArts);

router.get('/arts/create', artsController.showCreate);

router.post('/arts/create', artsController.processCreate, artsController.getSignedUrl);

router.get('/arts/:slug', artsController.showSingle);

