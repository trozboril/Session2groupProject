exports.seed = function(knex, Promise) {
 return Promise.join(
   // Deletes ALL existing entries
   knex('brewery').del(),

   // Inserts seed entries
   knex('brewery').insert(
       {
           id: 1,
           name: 'The Tasty Tap',
           address: '18 S. Spear Blvd',
           city: 'Denver',
           state: 'CO',
           zip: 80108,
           description: 'Great place, better friends.'
       }),
   knex('brewery').insert(
       {
           id: 2,
           name: 'Fine Fancy Franks',
           address: '201 W. Lincoln Ave',
           city: 'Denver',
           state: 'CO',
           zip: 80111,
           description: 'Enjoy your beer, and getting drunk, we also have wine.'
       }),
   knex('brewery').insert(
       {
           id: 3,
           name: "Chunk's Chunkorium of Cheers",
           address: '2508 Brockton Cir.',
           city: 'Denver',
           state: 'CO',
           zip: 60565,
           description: 'Crazy place, watch out for meth heads!'
       })

   );
};