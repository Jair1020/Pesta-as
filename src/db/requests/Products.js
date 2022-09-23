const { Product, Category } = require('../db.js')

const getProducts = async () => {
  try {
    const products = await Product.findAll({
      raw: true,
      where: {
        disabled: false
      },
      attributes: ['id', 'name_product', 'price'],
      include: [{
        model: Category,
        attributes: ['name_category', 'id']
      }],

    })
    return products
  } catch (err) {
    console.log(err)
    return (err)
  }
}
const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      raw: true,
      attributes: ['id', 'name_product', 'price'],
      include: [{
        model: Category,
        attributes: ['name_category', 'id']
      }],

    })
    return products
  } catch (err) {
    console.log(err)
    return (err)
  }
}

const updateProduct = async (product) => {
  try {
    const updateProduct = await Product.update(product, {
      raw: true,
      where: {
        id: product.id
      }
    })
    if (!product.disabled) {
      const instanceProduct = await Product.findByPk(product.id, { raw: false })
      await instanceProduct.setCategory(product.id_category)
    }
    return true
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
const createProduct = async (product)=>{
  try{
    const newProduct = await Product.create (product)
    await newProduct.setCategory (product.id_category)
    return true
  }catch (err){
    console.log(err)
    throw new Error(err)
  }
}

module.exports = {
  getProducts,
  updateProduct,
  createProduct,
  getAllProducts
}