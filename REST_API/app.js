var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

mongoose.connect('mongodb://localhost/refactorme');

var app = express();
var api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

var Grant = require('grant-express')
  , grant = new Grant(require('./config.json'))

var common = require('./common');
var config = common.config();

var twitter_consumer_key= config.twitter_consumer_key;
var twitter_consumer_secret = config.twitter_consumer_secret;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'grant', secret: 'very secret',
  saveUninitialized: true, resave: true
}));
app.use(grant);

app.use('/api', api);

app.get('/handle_twitter_callback', function (req, res) {
  var string = JSON.stringify(req.query);
  var jsonified = JSON.parse(string);
  var userInfo = jsonified.raw;
  var oauthToken = jsonified.raw.oauth_token;
  var oauthTokenSecret = jsonified.raw.oauth_token_secret;
  var screenName = jsonified.raw.screen_name;
  var userID = jsonified.raw.user_id;

  res.redirect('/api/login?twitterToken=' + oauthToken + '&twitterSecret=' + oauthTokenSecret + '&twitterName=' + screenName + '&twitterID=' + userID);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  // console.log(req);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

