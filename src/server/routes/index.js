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

router.post('/login', function (req, res, next) {

});

// *** register route *** //
router.get('/register', function (req, res, next) {
	res.render('register');
});

router.post('/register', function (req, res, next) {

});


// *** get all breweries route *** //
router.get('/breweries', function (req, res, next) {
	res.render('breweries');
});


// *** get brewery by ID *** //
router.get('/brewery/:id', function (req, res, next) {
	res.redirect('/brewery/' + req.params.id);
});

// *** get user by ID (user page after login) *** //
router.get('/user/:id', function (req, res, next) {
	res.redirect('/user/' + req.params.id);
});

// *** serve up pubcrawl app *** ///
rouer.get('/pubcrawl', function (req, res, next) {
	res.render('pubCrawl');
});

// *** get brewery owner render brewery update page *** //
router.get('/user/owner/:id', function (req, res, next) {
	res.redirect('/owner/' + req.params.id);
});


// *** get all beers *** //
router.get('/beers', function (req, res, next) {
	res.render('beers');
});

// *** get beer by id *** //
router.get('/beer/:id', function (req, res, next) {
	res.reirect('/beer' + req.params.id);
});

// *** logout user *** //
router.get('/logout', function (req, res, next) {
	res.render('logout');
});

//*** create a beer *** //
router.get('/user/owner/:id/createbeer', function (req, res, next) {
	
});

router.post('/createbeer', function (req, res, next) {

});

// *** user after logged in can create a new brewery *** //

router.get('/newbrewery', function (req, res, next) {
	res.render('newBrewery');

});

router.post('/newbrewery', function (req, res, next) {

});

// *** basic contact page *** //

router.get('/contact_tapt', function (req, res, next) {
	res.render('contact');

});

router.post('/contact_tapt', function (req, res, next) {

});

module.exports = router;
