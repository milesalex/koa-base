module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: false,
    operatorsAliases: false,
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'koa_api_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
