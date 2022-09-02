const { Password } = require("../db")




const verifyPassword = async (p) => {
  try {
    const pass = await Password.findByPk(1)
    if (pass.password === p) {
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  verifyPassword
}