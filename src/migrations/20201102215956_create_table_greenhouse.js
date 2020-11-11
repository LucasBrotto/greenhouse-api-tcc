
exports.up = function(knex) {
    return knex.schema.createTable('greenhouse_table', table => {
        table.increments('id').primary()
        table.integer('temperature')
        table.integer('humidity')
        table.integer('ventilation')
        table.integer('irrigation')
        table.integer('id_user').references('id').inTable('users_table')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('greenhouse_table')
};
