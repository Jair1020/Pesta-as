const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("stylist_Category",    {
    percentage:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:15
    },

  },{ timestamps: false})
}