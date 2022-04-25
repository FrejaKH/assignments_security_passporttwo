const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const keys = require('./config/keys');  // various constants

// Passport Config Strategies execute
const passport = require('passport');
const Strategies = require('./config/passport')(passport);

// DB Config execute and server connect
//const db = require('./config/keys').mongoURI;
mongoose.connect('mongodb://0.0.0.0/passportTwo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then( function() { console.log('mongoose connection open'); })
    .catch( function(err) { console.error(err); });

const app = express();
app.locals.pretty = app.get('env') === 'development';       // pretty print html

// view engine setup pug and static
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Express session prep
app.use(require('express-session')({                        // passport initialize
    secret: keys.session.cookieSecret,                      // do the keyboard cat
    resave: true,                                           // to create entropy
    saveUninitialized: false
}));

// Passport middleware prep
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
// Global variables using flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
