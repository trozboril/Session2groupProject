var express = require('express');
var router = express.Router();

// *** root route *** //
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Tapt!' });
});

// *** login route *** //
router.get('/login', function (req, res, next) {
	res.render('login');
});

// *** register route *** //
router.get('/register', function (req, res, next) {
	res.render('register');
});

// *** get all breweries route *** //
router.get('/breweries', function (req, res, next) {
	res.render('breweries');
});


// *** get brewery by ID *** //
router.get('/brewery/:id', function (req, res, next) {
	res.render('brewery/' + req.params.id);
});

// *** get user by ID (user page after login) *** //
router.get('/user/:id', function (req, res, next) {
	res.render('user/' + req.params.id);
});

// *** serve up pubcrawl app *** ///
rouer.get('/pubcrawl', function (req, res, next) {
	res.render('pubcrawl');
});

// *** get brewery owner by id *** //
router.get('/user/owner/:id', function (req, res, next) {
	res.render('owner' + req.params.id);
});


// *** get all beers *** //
router.get('/beers', function (req, res, next) {
	res.render('beers');
});

// *** get beer by id *** //
router.get('/beer/:id', function (req, res, next) {
	res.render('beer' + req.params.id);
});

// *** logout user *** //
res.get('/logout', function (req, res, next) {
	res.render('logout');
});

// *** user after logged in can create a new brewery *** //
res.get('/newbrewery', function (req, res, next) {
	res.render('newbrewery');
});

// *** basic contact page *** //
res.get('/contact_tapt', function (req, res, next) {
	res.render('contact_tapt');
});

module.exports = router;
