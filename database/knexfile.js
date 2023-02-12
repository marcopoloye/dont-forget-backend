// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const connections = {
  development: {
    client: 'pg',
    connection: {
      host: 'salt.db.elephantsql.com',
      port: '5432',
      database: 'lxjtzbxl',
      user:     'lxjtzbxl',
      password: 'ouZmfl34I-Ybv-LdwtjKAJ7U0NkVlVa2',
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.ELE_URL,
  },
};

module.exports = 
  process.env.NODE_ENV === 'production'
    ? connections.production
    : connections.development;
