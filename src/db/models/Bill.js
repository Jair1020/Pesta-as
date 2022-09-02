const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "bill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bill_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("aprobada", "proceso", "pendiente", "rechazada"),
        defaultValue:'proceso'
      },
      observations: {
        type: DataTypes.TEXT,
        defaultValue: ''
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      debt: {
        type: DataTypes.INTEGER,
      },
      catch: {
        type: DataTypes.INTEGER,
      },
      transferDav: {
        type: DataTypes.INTEGER,
      },
      transferBanc: {
        type: DataTypes.INTEGER,
      },
      card: {
        type: DataTypes.INTEGER,
      }
    },
    {
      timestamps: false,
    }
  );
};