const { Client } = require("../db")

const createClient = async (client) => {
  try {
    const clientFounded = await Client.findByPk(client.id)

    if (!clientFounded) {
      const newClient = await Client.create(client)
      return newClient.get({ plain: true })
    } else {
      const updatedClient = await Client.update({ client }, {
        where: {
          id: client.id
        },
      })
      return updatedClient
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

const getOneClient = async (id) => {
  try {
    const client = await Client.findByPk(id)
    return client

  } catch (err) {
    console.log(err)
    return (err)
  }
}



module.exports = {
  createClient,
  getOneClient
}