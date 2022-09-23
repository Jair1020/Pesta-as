const { Client, Bill, ServiceDone, Service, Stylist } = require("../db")
const { Op } = require("sequelize");

const createClient = async (client) => {
  try {
    const clientFounded = await Client.findByPk(client.id)

    if (!clientFounded) {
      const newClient = await Client.create(client)
      return newClient.get({ plain: true })
    } else {
      const updatedClient = await Client.update( client , {
        where: {
          id: client.id
        },
      })
      return updatedClient
    }
  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al crear o actualizar el cliente')
  }
}

const getOneClient = async (id) => {
  try {
    const client = await Client.findByPk(id)
    return client

  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al obtener el cliente')
  }
}
const getBillsClient = async (id) => {
  try {
    const bills = await Client.findByPk(id, {
      raw: false,
      include: [{
        model: Bill,
        order: [
          ["id", "DESC"]],
        include: [
          {
            model: ServiceDone,
            order: [
              ["id", "DESC"]],
            include: [Service, Stylist],
          },
        ],
        attributes: ["id", "bill_date"],
        limit:10,
      }]
    })
    if (!bills)return bills

    let b=JSON.parse(JSON.stringify(bills))
    let services_client= []
    let info = {
      name_client:b.name_client,
      id:b.id,
      personal_obs:b.personal_obs,
      technical_obs:b.technical_obs
    }
    b.bills.forEach ((e)=>{
      info.id_bill=e.id
      info.date=e.bill_date
      e.serviceDones.forEach ((s)=>{
        info.price=s.price_Total
        info.name_service=s.service.name_service,
        info.name_stylist= s.stylist.name_stylist
        services_client.push({...info})
      })
    })
    return services_client
  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error con obetener las ultimas facturas del cliente')
  }
}

const updateObs= async (obs)=>{
  try{
    const updatedClient = await Client.update( obs, {
      where: {
        id: obs.id
      },
    })
    return updatedClient
  }catch (err){
    console.log (err)
    throw new Error ('Error al guardar las Observaciones')
  }
}

const searchName = async (name)=>{
  try{ 
    let client = await Client.findAll ({
      where:{
        name_client: {
          [Op.like]:`%${name}%` 
        } 
      }
    })
    return client
  }catch (err){
    console.log (err)
    throw new Error ('Error al buscar el cliente por nombre')
  }
}


module.exports = {
  createClient,
  getOneClient,
  getBillsClient,
  updateObs,
  searchName
}


