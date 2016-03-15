
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beertypes', function(table) {
    table.increments('id').unique();
    table.text('name');
    table.text('description');
    table.text('colornum');
    table.text('bitterness');
    table.text('alcoholnum');
    table.text('foodpairings');
    table.text('glassware');
    table.text('servingtemp');
    table.text('colortxt');
    table.text('clarity');
    table.text('carbonationvisual');
    table.text('alcoholtxt');
    table.text('hop');
    table.text('malt');
    table.text('esters');
    table.text('phenols');
    table.text('body');
    table.text('carbonationtaste');
    table.text('finishlength');
    table.text('attenuation');
    table.text('hopsingr');
    table.text('maltingr');
    table.text('water');
    table.text('yeast');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beertypes');
};
