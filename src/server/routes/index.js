var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// *** root route *** //
router.get('/', function (req, res, next) {
	if( !req.user ){
  		res.render('index', { title: 'Tapt!' });
	} else {
		res.render('index', { title: 'Tapt,', name: req.user.name, id: req.user.id});
	}
});


// *** get all breweries route *** //
router.get('/breweries', function (req, res, next) {
	knex.select('*').from('breweries')
	.then(function (breweries) {
		if( !req.user ) {
			res.render('breweries', {breweries: breweries});
	 	} else {
	  		knex('users').where('id', req.user.id)
	  		.then(function (user) {
	  		res.render('breweries', {name: user[0].name, breweries: breweries, id: req.user.id});
	  	});
	  }
	});
});


// *** get brewery by ID *** //
router.get('/brewery/:id', function (req, res, next) {
	// for an individual brewery,
	// breweries/1
	knex.select('*').from('breweries').where('id', req.params.id)
	.then(function (brewery) {
		console.log(brewery);
		res.render('brewery', {
			brewery: brewery,
			});
	});
});


// *** get user by ID (user page after login) *** //
router.get('/user/:id', function (req, res, next) {
	if (!req.user) {
		res.redirect('/');
	} else {
		knex.select('*').from('users').where('id', req.params.id)
		.then(function () {
			knex.select('*').from('brewery_owner').where('user_id', req.params.id)
		.then(function () {
			knex.select('*').from('saved_brewery').where('user_id', req.params.id)
		.then(function () {
			knex.select('*').from('saved_beers').where('user_id', req.params.id)
		.then(function () {
			knex.select('*').from('breweries').where('')
		});
		});
		});
		});
	}
});

// *** serve up pubcrawl app *** ///
router.get('/pubcrawl', function (req, res, next) {
	res.render('pubCrawl');
});

// *** get brewery owner render brewery update page *** //
router.get('/user/owner/:id', function (req, res, next) {
	res.redirect('/owner');
});

//*** create a beer *** //
router.get('/user/:id/brewery/owner/:shopID', function (req, res, next) {
	
});

router.post('/createbeer', function (req, res, next) {

});

// *** user after logged in can create a new brewery *** //

router.get('/breweries/new', function (req, res, next) {
	res.render('newBrewery', {id: req.user.id});
});

router.post('/breweries/new', function (req, res, next) {
	// routes should be the resource and then the "action"
	// eg => breweries
	if( !req.user ){
		res.redirect('/');
	} else {
		var zipper = parseInt(req.body.zip);
		console.log('body', req.body);
		console.log('user:', req.user);

		// table names should be plural
		// e.g. breweries

		knex('breweries').insert({
			name: req.body.name,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip: zipper,
			description: req.body.description,
			image: req.body.image
		}, 'id').then(function (breweryId) {
			knex('brewery_owner').insert({
				brewery_id: parseInt(breweryId),
				user_id: parseInt(req.user.id)
			}).then(function () {
				res.redirect('/breweries');
			});

		});
	}
});

// *** basic contact page *** //

router.get('/contact', function (req, res, next) {
	res.render('contact', {id: req.user.id});

});

router.post('/contact', function (req, res, next) {

});

module.exports = router;
