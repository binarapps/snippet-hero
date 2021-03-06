var express = require('express');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var appLogger = require('./lib/logger');
var dbConfig = require('./config/config.json');
var schedule = require('./config/schedule');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var snippets = require('./routes/snippets');
var ratings = require('./routes/ratings');
var snippetComments = require('./routes/comments');

var env = process.env.NODE_ENV || 'development';
var secrets;

if (env === 'production') {
  secrets = require('./config/secrets-production');
} else {
  secrets = require('./config/secrets');
}
require('./config/passport_configuration');

var app = express();
schedule();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('combined', {
  stream: appLogger.stream
}));

var conStringPgSession;
if (env === 'production') {
  conStringPgSession = process.env[dbConfig[env].use_env_variable];
} else {
  conStringPgSession = dbConfig[env];
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: secrets.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new pgSession({
    conString : conStringPgSession
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/snippets', snippets);
app.use('/ratings', ratings);
app.use('/snippets', snippetComments);

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
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
