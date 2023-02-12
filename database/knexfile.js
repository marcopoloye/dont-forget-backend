// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'salt.db.elephantsql.com',
      port: '5432',
      database: 'lxjtzbxl',
      user:     'lxjtzbxl',
      password: 'ouZmfl34I-Ybv-LdwtjKAJ7U0NkVlVa2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
