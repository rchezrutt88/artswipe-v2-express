/**
 * Created by rdrutt on 2/13/17.
 */
const router = require('express').Router();
const data = require('../data/data.json');

router.get('/', function (req, res) {
    res.status(200).json(data.models)
});

module.exports = router;
