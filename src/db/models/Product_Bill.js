
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
    },
    num_order:{
      type:DataTypes.INTEGER,
    },
    price_Total:{
      type: DataTypes.VIRTUAL,
      get (){
        return ((this.price * this.amount) - this.sale)   
      }
    }
  },{ timestamps: false})
}