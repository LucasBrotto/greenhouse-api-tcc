const config = require('../../knexfile')
const knex = require('knex')
const env = process.env.DB_ENV || 'development'

const db = knex(config[env])

module.exports = db