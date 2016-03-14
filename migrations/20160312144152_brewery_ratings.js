exports.up = function(knex, Promise) {
  return knex.schema.createTable('brewery_ratings', function(table) {
    table.increments();
    table.integer('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('brewery_id');
    table.integer('rating');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('brewery_ratings');
};