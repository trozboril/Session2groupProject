exports.up = function(knex, Promise) {
  return knex.schema.createTable('beers', function(table) {
    table.increments();
    table.string('type');
    table.string('name');
    table.string('brewer');
    table.float('abv');
    table.float('ibu');
    table.string('description');
    table.integer('brewery_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beers');
};