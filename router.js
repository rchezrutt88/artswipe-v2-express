/**
 * Created by rdrutt on 2/17/17.
 */
const express = require('express'),
    router = express.Router(),
    appController = require('./controllers/app.controller'),
    artsController = require('./controllers/arts.controller');

module.exports = router;

router.get('/', appController.showHome);

// arts routes
router.get('/arts', artsController.showArts);
// router.get('/arts/:slug', artsController.showSingle);
// seed events

router.get('/arts/seed', artsController.seedArts);
