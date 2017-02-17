var express = require('express');
var router = express.Router();
const modelsRouter = require('./models');
const userRouter = require('./users');

router.use('/models', modelsRouter);
router.use('/users', userRouter);

/* GET home page. */

router.get('/', function(req, res) {
  res.render('home', {user: req.user});
});


module.exports = router;

