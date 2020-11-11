const config = require('../../knexfile')
const knex = require('knex')
const env = process.env.DB_ENV || 'development'

const db = knex(config[env])

console.log(db)

module.exports = db