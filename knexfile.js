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
    client: 'postgres',
    connection: {
      host: 'ec2-34-237-247-76.compute-1.amazonaws.com',
      database: 'd1gcv8b66d852j',
      user:     'pvkdfguerkekcr',
      password: '1e9ed30095ff11dfa29cf5f94ed7996c4049f55dded10b2021ab01e06f8cad76'
    },
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