var express = require('express');
var router = express.Router();
var passport = require('passport');
var knex = require('../db/knex.js');

router.get('/login', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
  	failureRedirect: '/login' 
  }),
  function(req, res) {
  	knex('users').where('id', req.user)
  	.then(function (user) {
  		res.redirect('/breweries');
  	});

    // Successful authentication, redirect home.
    // res.render('breweries', {name: req.user});
  });

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});


module.exports = router;