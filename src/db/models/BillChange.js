const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "billChange",
    {
      name_change: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateChange:{
        type: DataTypes.DATEONLY,
      },
      reasonChange:{
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false,
    }
  );
};
