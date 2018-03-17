const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  operatorsAliases: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV !== 'development',
  },
});

require('./models/credential')(sequelize, Sequelize.DataTypes);

sequelize.sync();
