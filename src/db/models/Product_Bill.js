
const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("product_Bill",    {
    sale:{
      type: DataTypes.INTEGER,
    },
    amount:{
      type: DataTypes.INTEGER,
    },
    price:{
      type: DataTypes.INTEGER,
    }
  },{ timestamps: false})
}