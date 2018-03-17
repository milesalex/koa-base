const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV !== 'development',
  },
  define: {
    underscored: true,
  },
});

require('./models/credential')(sequelize, Sequelize.DataTypes);

sequelize.sync();
