/**
 * Created by rdrutt on 2/13/17.
 */
const modelsRouter = require('express').Router();
const allModels = require('../models/index.js');

modelsRouter.get('/models', function (req, res) {
    res.status(200).json({allModels});
});

module.exports = modelsRouter;

