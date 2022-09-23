const { Op } = require("sequelize")
const { Expense } = require("../db")


const createExpense = async (expense) => {
  try {
    let newExpense = await Expense.create(expense)
    return true
  } catch (err) {
    console.log(err)
    throw new Error('Error al crear el gasto')
  }

}

const getExpenseDaily = async () => {
  try {
    let expenses= await Expense.findAll({
      where: {
        expense_date: new Date()
      }
    })
    return expenses
  } catch (err) {
    console.log(err)
    throw new Error('Error al obtener los gastos del día')
  }
}
const getExpenses = async (date) => {
  try {
    let expenses= await Expense.findAll({
      where: {
        expense_date:{
          [Op.between]: date
        }
      }
    })
    return expenses
  } catch (err) {
    console.log(err)
    throw new Error('Error al obtener los gastos del día')
  }
}


module.exports = {
  createExpense,
  getExpenseDaily,
  getExpenses
}