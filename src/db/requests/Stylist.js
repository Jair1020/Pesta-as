const { Stylist, Stylist_Category, Category } = require('../db')

const getStylists = async () => {
  try {
    const stylists = await Stylist.findAll({
      where: {
        disabled: false
      },
      raw: true
    })
    return stylists
  } catch (err) {
    console.log(err)
    return (err)
  }
}

const updateStylist = async (stylist) => {
  try {
    const updateStylist = await Stylist.update(stylist, {
      raw: true,
      where: {
        id: stylist.id
      }
    })
    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al actualizar el esteticista')
  }
}
const createStylist = async ({ stylist, percentages }) => {
  try {
    let categories
    if (!percentages) {
      categories = await Category.findAll({ raw: true })
    }

    const newStylist = await Stylist.create(stylist)
    !percentages && categories.map((e) => {
      if (e.name_category !== 'producto') {
        newStylist.addCategory(e.id)
      }
    })
    percentages && percentages.map(e => {
      if (e.name_category !== 'producto') {
        newStylist.addCategory(e.categoryId, {
          through: {
            percentage:e.percentage
          }
        })
      }
      
    })

    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al crear el esteticista')
  }
}
// {
//   [1]     name_category: 'retiro',
//   [1]     categoryId: 3,
//   [1]     percentage: 20,
//   [1]     stylistId: '1032165489'
//   [1]   }
const updatePercentage = async (percentages) => {
  try {

    let stylist = await Stylist.findByPk(percentages[0].stylistId, { raw: false })
    await stylist.setCategories([])
    percentages.forEach(async (e) => {
      let { categoryId, percentage} = e
      const stylist_cate = await stylist.addCategory(categoryId, {
        through: {
          percentage: percentage
        }
      })
    })

    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al actualizar el porcentaje')
  }
}

const getPercentages = async (id) => {
  try {
    const stylist_categories = await Stylist_Category.findAll({
      where: {
        stylistId: id,
      }
    })
    return stylist_categories

  } catch (err) {
    console.log(err)
    throw new Error('Error al obtener los porcentages')
  }
}





module.exports = {
  getStylists,
  updateStylist,
  createStylist,
  updatePercentage,
  getPercentages
}