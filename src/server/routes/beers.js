var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/beers', function (req, res, next) {
  
  knex.select('*').from('beertypes')
  .then(function (beers) {
    console.log(beers);
        res.render('beers', {beers: beers});
      });

});

module.exports = router;
