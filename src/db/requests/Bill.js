const { Bill } = require("../db")

const createBill = async (bill) => {
  try {
    const newBill = await Bill.create(bill
    )
    await newBill.setClient (bill.id_client)

    return newBill.get({ plain: true }) 

  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  createBill
}