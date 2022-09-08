const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "expense",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      expense_reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      expense_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
