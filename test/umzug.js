const Umzug = require('umzug');
const models = require('../api/db/models');

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor,
      () => {
        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
      },
    ],
    path: '../api/db/migrations/',
    pattern: /\.js$/,
  },
});

module.exports = umzug;
