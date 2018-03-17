module.exports = function exports(sequelize, DataTypes) {
  const Credential = sequelize.define(
    'Credential',
    {
      type: DataTypes.STRING,
      credentials: DataTypes.JSON,
      readOnly: DataTypes.BOOLEAN,
      lastRefreshRequest: DataTypes.DATE,
      lastRefreshError: DataTypes.DATE,
      lastRefreshSuccess: DataTypes.DATE,
    },
    {
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      tableName: 'credential',
      classMethods: {
        associate(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Credential;
};
