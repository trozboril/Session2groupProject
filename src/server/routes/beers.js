var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/beers', function (req, res, next) {
  // req.query.filter => "american"
  knex.select('*').from('beertypes')
  .then(function (beers) {
      // our standard beers
      var typesOfBeers = ["american", "bohemian", "belgian", "german", "english", "french"];
      
      var sortedBeers = beers.reduce(function (accumulator, beer) {
        var beerType = beer.name.replace("-", " ").split(" ")[0].toLowerCase();

        // Check for the type of the beer, if it is one of our standard beers
        if ( typesOfBeers.indexOf(beerType) >= 0 ) {
          // if type is already inside the accumulator
          if ( accumulator[beerType] ) {
            // push into the already existing array
            // e.g. accumulator = { "american": ["some beer"] };
            //      accumulator["american"].push("some other beer")
            //      accumulator => { "american": ["some beer", "some other beer"] };
            accumulator[beerType].push(beer);
          } else {
            // if it's not in the accumulator, create a new array
            // e.g. accumulator = { "american": ["some beer"] };
            //      accumulator["belgian"] = ["some belgian beer"]
            //      accumulator => { "american": ["some beer"], "belgian": ["some belgian beer"] };
            accumulator[beerType] = [beer];
          }
        } else {
          // If the type of the beer is not in the typesOfBeers array...
          accumulator.others.push(beer);
        }

        // obj = { b: 5 };
        // obj.a = 3
        // { a: 3, b: 5 }
        // typesOfBeers.forEach(function (style) {
        //   console.log(accumulator, style, beer.name);
        // });
        return accumulator;
      }, { others: [] });


      // console.log(sortedBeers);
      res.render('beers', sortedBeers); 
    });
});



     

module.exports = router;
