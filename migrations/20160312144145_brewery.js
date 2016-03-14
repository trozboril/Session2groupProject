exports.up = function(knex, Promise) {
  return knex.schema.createTable('brewery', function(table) {
    table.increments();
    table.string('name');
    table.string('address');
    table.string('city');
    table.string('state');
    table.integer('zip');
    table.integer('beer_id');
    table.string('description');
    table.string('image');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('brewery');
};