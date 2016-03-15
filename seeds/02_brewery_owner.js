exports.seed = function(knex, Promise) {
 return Promise.join(
   // Deletes ALL existing entries
   knex('brewery_owner').del(),

   // Inserts seed entries
   knex('brewery_owner').insert(
       {
           id: 1,
           brewery_id: 1,
           user_id: 1
       }),
   knex('brewery_owner').insert(
       {
           id: 2,
           brewery_id: 3,
           user_id: 1
       }),

   knex('brewery_owner').insert(
       {
           id: 3,
           brewery_id: 2,
           user_id: 2
       })
   );
};