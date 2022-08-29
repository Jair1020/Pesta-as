const { Client } = require("../db")

const createClient = async (client) => {
  try {
    const newClient = await Client.create(client
    )
    return newClient.get({ plain: true })

  } catch (err) {
    console.log(err)
    return err
  }
}

const getOneClient = async (id) => {
  try{
    const client = await Client.findByPk (id)
    return client

  }catch (err){
    console.log (err)
    return (err)
  }
}



module.exports = {
  createClient,
  getOneClient
}