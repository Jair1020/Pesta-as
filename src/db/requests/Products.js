const {Product} = require ('../db.js')

 const getProducts = async ()=>{
  try{
    const products = await Product.findAll ({
      attributes: ['id', 'name_product', 'price'],
      raw: true
    })
    return products
  }catch (err){
    console.log (err)
    return (err)
  }
}

module.exports = {
  getProducts
}