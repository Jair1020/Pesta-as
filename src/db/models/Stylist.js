const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stylist",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name_stylist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
