const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "client",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name_client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      personal_obs:{
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      technical_obs:{
        type: DataTypes.TEXT,
        defaultValue: '',
      }
    },
    {
      timestamps: false,
    }
  );
};
