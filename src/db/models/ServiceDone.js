const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "serviceDone",
    {
      sale:{
        type: DataTypes.INTEGER,
      },
      amount:{
        type: DataTypes.INTEGER,
      },
      price:{
        type: DataTypes.INTEGER,
      },
      num_order:{
        type:DataTypes.INTEGER,
      }
    },
    {
      timestamps: false,
    }
  );
};