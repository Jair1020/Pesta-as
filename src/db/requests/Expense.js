const { Expense } = require("../db")


const createExpense = async (expense)=>{
  try{
    let newExpense = await Expense.create (expense)
    return true
  }catch (err){
    console.log (err)
    throw new Error ('Error al crear el gasto')
  }

}

module.exports = {
  createExpense
}