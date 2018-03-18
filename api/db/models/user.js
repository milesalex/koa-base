module.exports = function exports(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      firstName: { type: DataTypes.STRING, field: 'first_name' },
      lastName: { type: DataTypes.STRING, field: 'last_name' },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      customerId: { type: DataTypes.STRING, field: 'customer_id', unique: true },
      plan: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: 'USER' },
      lastSuccessfulCharge: { type: DataTypes.DATE, field: 'last_successful_charge' },
      resetPasswordToken: { type: DataTypes.STRING, field: 'reset_password_token' },
      resetPasswordExpires: { type: DataTypes.DATE, field: 'reset_password_expires' },
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'user',
      classMethods: {
        associate(models) {
          // associations can be defined here
        },
        displayName() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  );
  return User;
};
