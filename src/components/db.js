const config = require('../../knexfile')
const knex = require('knex')
// const env = process.env.DB_ENV || 'development'
const env =  {
    client: 'pg',
    connection: {
        host: 'ec2-34-237-247-76.compute-1.amazonaws.com',
        database: 'd1gcv8b66d852j',
        user:     'pvkdfguerkekcr',
        password: '1e9ed30095ff11dfa29cf5f94ed7996c4049f55dded10b2021ab01e06f8cad76'
    }
};
const db = knex(config[env])

module.exports = db