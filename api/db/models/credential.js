module.exports = function exports(sequelize, DataTypes) {
  const Credential = sequelize.define(
    'Credential',
    {
      type: { type: DataTypes.STRING, allowNull: false },
      credentials: { type: DataTypes.JSON, allowNull: true },
      readOnly: { type: DataTypes.BOOLEAN, field: 'read_only' },
      lastRefreshRequest: { type: DataTypes.DATE, field: 'last_refresh_request' },
      lastRefreshError: { type: DataTypes.DATE, field: 'last_refresh_error' },
      lastRefreshSuccess: { type: DataTypes.DATE, field: 'last_refresh_success' },
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
