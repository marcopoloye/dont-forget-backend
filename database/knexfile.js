// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const connections = {
  development: {
    client: 'postgres',
    connection: {
      host: 'salt.db.elephantsql.com',
      port: '5432',
      database: 'lxjtzbxl',
      user:     'lxjtzbxl',
      password: process.env.DB_PW,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgres',
    connection: process.env.ELE_URL,
  },
};

module.exports = 
  process.env.NODE_ENV === 'production'
    ? connections.production
    : connections.development;
