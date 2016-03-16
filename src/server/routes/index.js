var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// *** root route *** //
router.get('/', function (req, res, next) {
	if( !req.user ){
  		res.render('index', { title: 'Tapt!' });
	} else {
		res.render('index', { maintitle: 'Tapt!', title: 'Tapt,', name: req.user.name, id: req.user.id});
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
			knex.from('beers').where('brewery_id', brewery[0].id)
				.then(function (beers) {
					res.render('brewery', 
					{
					brewery: brewery[0],
					beers: beers,
					id: req.user.id
			});
			});
		});
});

// *** SAVE BREWERY *** //
router.post('/brewery/:id/save', function (req, res, next) {
	if( !req.user ){
		res.redirect('/');
	} else {
		knex('saved_brewery').insert({
			user_id: req.user.id,
			brewery_id: req.body.id
		}).then(function () {
			res.redirect('/user/' + req.user.id);
		});
	}
});

// *** remove a saved brewery *** //
router.post('/brewery/:id/remove', function (req, res, next) {
	knex('saved_brewery').where('brewery_id', req.params.id).del()
	.then(function () {
		res.redirect('/user/' + req.user.id);
	});
});

// *** SAVE A BEER *** //

router.post('/beer/:id/save', function (req, res, next) {
	if( !req.user ) {
		res.redirect('/');
	} else {
		knex('saved_beer').insert({
			user_id: req.user.id,
			beer_id: req.body.id
		}).then(function () {
			res.redirect('/user/' + req.user.id);
		});
	}
});

// *** remove a saved beer *** //
router.post('/beer/:id/remove', function (req, res, next) {
	knex('saved_beer').where('beer_id', req.params.id).del()
	.then(function () {
		res.redirect('/user/' + req.user.id);
	});
});

// *** get user by ID (user page after login) *** //
router.get('/user/:id', function (req, res, next) {
	if (!req.user) {
		res.redirect('/');
	} else {
		knex.select('*').from('users').where('id', req.params.id)
		.then(function (user) {
			knex.select('*').from('brewery_owner').where('user_id', req.params.id)
		.then(function (owner) {
			knex.from('breweries').innerJoin('brewery_owner', 'breweries.id', 'brewery_id')
		.then(function (breweries) {
			knex.select('*').from('saved_brewery').where('user_id', req.params.id)
		.then(function (brewery) {
			knex.from('breweries').innerJoin('saved_brewery', 'breweries.id', 'brewery_id')
		.then(function (savedBrewery) {
			knex.select('*').from('saved_beer').where('user_id', req.params.id)
		.then(function (beer) {
			knex.from('beers').innerJoin('saved_beer', 'beers.id', 'beer_id')
		.then(function (savedBeers) {
			res.render('user', {
				id: req.user.id,
				user: user[0],
				owner: owner,
				breweries: breweries,
				brewery: brewery,
				savedBrewery: savedBrewery,
				beer: beer,
				savedBeers: savedBeers
			});
		});
		});
		});
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
router.get('/brewery/:id/owner/edit', function (req, res, next) {
	knex('beers').where('brewery_id', req.params.id)
	.then(function (beers) {
		knex.select('*').from('breweries').where('id', req.params.id)
		.then(function (brewery) {
			res.render('owner', {brewery: brewery[0], beers: beers, id: req.user.id});
		});
	});
});

//*** create a beer *** //

router.post('/brewery/:id/beer/add', function (req, res, next) {
	var numABV = parseInt(req.body.abv);
	var numIBU = parseInt(req.body.ibu);
	knex('beers').insert({
			type: req.body.type,
			name: req.body.name,
			brewer: req.body.brewer,
			abv: numABV,
			ibu: numIBU,
			brewery_id: req.body.brewery_id,
			description: req.body.description
		}).then(function () {
			res.redirect('/brewery/' + req.body.brewery_id + '/owner/edit');
		});
});


//*** remove a beer from a brewery *** //

router.post('/breweries/:breweryID/beer/:beerID/remove', function (req, res, next) {
	knex('beers').where('id', req.params.beerID).del()
	.then(function () {
		res.redirect('/brewery/'+ req.params.breweryID +'/owner/edit');
	});
});

// *** edit a brewery *** //
router.post('/breweries/:id/edit', function (req, res, next) {
	console.log(req.body);
	knex('breweries')
  		.where('id', '=', req.params.id)
  		.update({
    	name: req.body.name,
    	address: req.body.address,
    	city: req.body.city,
    	state: req.body.state,
    	zip: req.body.zip,
    	description: req.body.description,
    	image: req.body.image
  }).then(function() {
  	res.redirect('/breweries/:id/owner/edit');
  });

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

router.get('/pubcrawl/breweries/:id', function (req, res, next) {
	knex.select('*').from('breweries').where('id', req.params.id)
	.then(function (info) {
		res.render('pubCrawl', {info: info});
	});
});

router.get('/pubCrawl', function (req, res, next) {
	knex.select('*').from('breweries')
	.then(function (breweries) {
		knex.render('pubCrawl', {breweries: breweries});
	});
});

module.exports = router;
