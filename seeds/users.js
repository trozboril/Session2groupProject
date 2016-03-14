exports.seed = function(knex, Promise) {
 return Promise.join(
   // Deletes ALL existing entries
   knex('users').del(),

   // Inserts seed entries
   knex('users').insert(
       {
           id: 1,
           name: 'Chunk "beer guzzler" Roz',
           email: 'loVexXxcHuNk@aol.com',
           password: 'chunkiscute',
       }),
   knex('users').insert(
       {
           id: 2,
           name: 'Fancy Frank',
           email: 'fancyfranks@gmail.com',
           password: 'fancyfranks'
       })
   );
};