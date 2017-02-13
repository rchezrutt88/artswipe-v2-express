/**
 * Created by rdrutt on 2/13/17.
 */
const router = require('express').Router();

router.get('/', function (req, res) {
    res.send("models!")
});

module.exports = router;
