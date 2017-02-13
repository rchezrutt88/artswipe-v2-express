var express = require('express');
var router = express.Router();
const modelsRouter = require('./models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/models', modelsRouter);
module.exports = router;
