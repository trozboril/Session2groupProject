exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_brewery', function(table) {
    table.increments();
    table.integer('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('brewery_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved_brewery');
};