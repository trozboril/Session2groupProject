var knex = require('../../server/db/knex');


module.exports = {
//     getBreweries: function(){
//         // Get all breweries
//         return knex.select().from('breweries');
//     },
//     getBrewery: function(id){
//         // Get one brewery that matches the id
// return knex.from('breweries').innerJoin('beers', 'breweries.name', 'beers.brewery').where({'breweries.id': id});
//     },
    getBeers: function(){
        var beer;
        // Get beers and brewery data
        knex.select('*').from('beertypes').then(function (beers) {
            beer = beers;
        });
        return beer;
        // Alias the beer name to beer_name and the brewery name to brewery_name
    }
    
};