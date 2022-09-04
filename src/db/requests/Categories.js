const { Category } = require('../db.js')

const getCategories = async () => {
  try {
    const categories = await Category.findAll({
      where: {
        disabled: false
      },
      attributes: ['name_category', 'id'],
      raw: true
    })
    return categories
  } catch (err) {
    console.log(err)
    return (err)
  }
}

module.exports = {
  getCategories
}