// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieSession = require('cookie-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var knex = require('./db/knex.js');
if ( !process.env.NODE_ENV ) { require('dotenv').config(); }


// *** routes *** //
var routes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'facebook-oauth2-session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));

//passport stuff middleware!
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },function(accessToken, refreshToken, profileFields, done) {
    knex('users')
      .where({ facebook_id: profileFields.id })
      .first()
      .then(function (user) {
        if ( !user ) {
          return knex('users').insert({
            facebook_id: profileFields.id,
            name: profileFields.displayName,
          }, 'id').then(function (id) {
            return done(null, id[0]);
          });
        } else {
          return done(null, user.id);
        }
      });
}));


passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser 
  // an identifier for your user, like their primary key from the 
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(userId, done) {
  if ( userId ) {
    knex('users')
      .where({ id: userId })
      .first()
      .then(function (user) {
        ( !user ) ? done() : done(null, user)
      })
      .catch(function (err) {
        done(err, null);
      });
  } else {
    done();
  }
  // here is where you will go to the database and get the 
  // user each time from it's id, after you set up your db
});


// *** main routes *** //
app.use('/', routes);
app.use('/auth', authRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
