
exports.up = function(knex) {
    return knex.schema.createTable('users_table', table => {
        table.increments('id').primary()
        table.string('login').notNull().unique()
        table.string('password').notNull()
        table.string('token')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_table')
};
