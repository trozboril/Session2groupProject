
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beertypes', function(table) {
    table.increments('id').unique();
    table.string('description');
    table.string('colornum');
    table.string('bitterness');
    table.string('alcoholnum');
    table.string('foodpairings');
    table.string('glassware');
    table.string('servingtemp');
    table.string('colortxt');
    table.string('clarity');
    table.string('carbonationvisual');
    table.string('alcoholtxt');
    table.string('hop');
    table.string('malt');
    table.string('esters');
    table.string('phenols');
    table.string('body');
    table.string('carbonationtaste');
    table.string('finishlength');
    table.string('attenuation');
    table.string('hopsingr');
    table.string('maltingr');
    table.string('water');
    table.string('yeast');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beertypes');
};
