const { Stylist } = require('../db')

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
const createStylist = async (stylist) => {
  try {
    const newStylist = await Stylist.create(stylist)
    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al crear el esteticista')
  }
}
const updatePercentage = async ({ stylistId, percentages}) => {
  try {

    percentages.map(async (e) => {
      let {categoryId,percentage}= e
      const percentageTable = await Stylist_Category.findOne({
        raw: false,
        where: {
          stylistId: stylistId,
          categoryId: categoryId
        }
      })
      if (percentageTable) {
        const update = await percentageTable.update({ percentage: percentage })
      }
    })
    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al actualizar el porcentaje')
  }
}






module.exports = {
  getStylists,
  updateStylist,
  createStylist,
  updatePercentage
}