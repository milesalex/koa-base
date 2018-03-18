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
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: false,
    operatorsAliases: false,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
