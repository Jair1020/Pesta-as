const { Bill, ServiceDone, Service, Product } = require("../db")

const createServiceDone = async (serv) => {
  try {
    const { id_bill, services } = serv
    const servicess = services.filter((e) => e.service)
    const product = services.filter((e) => (!e.service && e.price_Total))
    let servicesDondeID=[]

    const bill = await Bill.findByPk(id_bill, { raw: false, include: [{
      model: Product,
    }]})

    await bill.setProducts([])

    await Promise.all(servicess.map(async (e) => {
      let newService = {
        sale: e.sale,
        amount: e.amount,
        price: e.price_Total,
        num_order: e.num_order
      }
      if (e.saved) {
        let updateService = await ServiceDone.update(newService, { raw: false, where: { id: e.id_Done }, returning: true })
        let serviceUpdate = await ServiceDone.findByPk (e.id_Done,{raw:false})
        await serviceUpdate.setService(e.id)
        await serviceUpdate.setStylist(e.id_stylist)
      } else {
        let newServicesDone = await ServiceDone.create(newService)
        let serviceDone = JSON.parse(JSON.stringify(newServicesDone))
        servicesDondeID= [...servicesDondeID, {id_Done:serviceDone.id, id_service:e.id}]
        await newServicesDone.setService(e.id)
        await newServicesDone.setStylist(e.id_stylist)
        await newServicesDone.setBill(id_bill)
        
      }
    }))

    await Promise.all(product.map(async (e) => {
        const product_bill = await bill.addProduct(e.id, {
          through: {
            sale: e.sale,
            amount: e.amount,
            price: e.price_Total,
            num_order: e.num_order          
        }})    
    }))
    return servicesDondeID
  } catch (err) {
    console.log(err)
    throw new Error ('Ocurrio un error al guardar los servicios')
  }
}

module.exports = {
  createServiceDone
}
