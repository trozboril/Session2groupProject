exports.up = function(knex, Promise) {
  return knex.schema.createTable('brewery_owner', function(table) {
    table.increments();
    table.integer('brewery_id');
    table.integer('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('brewery_owner');
};
