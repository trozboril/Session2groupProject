var express = require('express');
var router = express.Router();
var queries = require('../../client/js/beers');

router.get('/', function(request, response, next) {
    // Query for beers here
    queries.getBeers().then(function(result){
      var beers = result;
    console.log(beers);
    response.render('beers', {beers: beers});
  });
});

module.exports = router;
