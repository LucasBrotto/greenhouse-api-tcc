module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'api',
      user:     'postgres',
      password: 'qwe123'
    },
    migrations: {
      directory: __dirname + '/scr/migrations',
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    },
  },  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
    ssl: true,
  },
};