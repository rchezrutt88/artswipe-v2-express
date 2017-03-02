require('dotenv').config();

const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    cors = require('cors');

var router = require('./router');

/*passport*/
// var session = require('express-session');
// var passport = require('passport');
// var flash = require('connect-flash');
// var localStrategy = require('passport-local');
// require('./config/passport')(passport);

mongoose.connect(process.env.DB_URI);

var app = express();

// require('./config/passport')(passport); // pass passport for configuration

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

// view engine setup

/*stormpath*/
var stormpath = require('express-stormpath');
app.use(stormpath.init(app, {
  website: true,
  apiKey: {
    id: '',
    secret:'',
    },
  application: {
    href: ''
    }
}));

app.on('stormpath.ready', function () {
    app.listen(3000);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Passport*/

// app.use(session({secret: 'juliet3927', resave: false, saveUninitialized: true }))
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// app.all('/*', function (req, res, next) {
//     res.set({
//         'Access-Control-Allow-Origin': ''
//         // ,
//         // 'Access-Control-Allow-Headers': "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
//         // 'Access-Control-Allow-Methods': 'GET, PUT, POST'
//     });
//     next();
// });

app.use(router);
/*Routes*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
