const { Op } = require("sequelize")
const { Bill, ServiceDone, Service, Product, Client, Stylist, Category, Stylist_Category } = require("../db")

const createServiceDone = async (serv) => {
  try {
    const { id_bill, services } = serv
    const servicess = services.filter((e) => e.service)
    const product = services.filter((e) => (!e.service && e.price))
    let servicesDondeID = []

    const bill = await Bill.findByPk(id_bill, {
      raw: false, include: [{
        model: Product,
      }]
    })

    await bill.setProducts([])

    await Promise.all(servicess.map(async (e) => {
      let newService = {
        sale: e.sale,
        amount: e.amount,
        price: e.price,
        num_order: e.num_order
      }
      if (e.saved) {
        let updateService = await ServiceDone.update(newService, { raw: false, where: { id: e.id_Done }, returning: true })
        let serviceUpdate = await ServiceDone.findByPk(e.id_Done, { raw: false })
        await serviceUpdate.setService(e.id)
        await serviceUpdate.setStylist(e.id_stylist)
      } else {
        let newServicesDone = await ServiceDone.create(newService)
        let serviceDone = JSON.parse(JSON.stringify(newServicesDone))
        servicesDondeID = [...servicesDondeID, { id_Done: serviceDone.id, id_service: e.id }]
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
          price: e.price,
          num_order: e.num_order
        }
      })
    }))
    return servicesDondeID
  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al guardar los servicios')
  }
}

const getDailyServices = async () => {
  try {
    const bills = await Bill.findAll({
      raw: false,
      where: {
        bill_date: new Date() /* {
          [Op.between]: ['2022-08-29', '2022-09-02']
        } */,
        status:{[Op.not]:'rechazada'}
      },
      include: [{
        model: Client,
      }, {
        model: ServiceDone,
        include: [Service, Stylist]
      }, {
        model: Product,
      }
      ]
    })
    let stylist_category = await Stylist_Category.findAll({ raw: true })
    let billsData = JSON.parse(JSON.stringify(bills))
    let servicesdaily = [];
    billsData.map((b) => {
      let dataBill = {
        id_bill: b.id,
        name_client: b.client.name_client,
        status: b.status,
        catch: b.catch,
        transferDav: b.transferDav,
        transferBanc: b.transferBanc,
        card: b.card,
        debt: b.debt
      }

      b.serviceDones.map(s => {
        dataBill.price = s.price_Total;
        dataBill.num_order = s.num_order;
        dataBill.name_service = s.service.name_service;
        dataBill.name_stylist = s.stylist.name_stylist
        let table = stylist_category.find(e => (e.stylistId == s.stylistId && e.categoryId == s.service.categoryId))
        dataBill.percentage = table.percentage
        servicesdaily.push({ ...dataBill })
      })
      dataBill = {
        id_bill: b.id,
        name_client: b.client.name_client,
        status: b.status,
        catch: b.catch,
        transferDav: b.transferDav,
        transferBanc: b.transferBanc,
        card: b.card,
        debt: b.debt
      }

      b.products.map(p => {
        dataBill.price = p.product_Bill.price_Total;
        dataBill.num_order = p.product_Bill.num_order;
        dataBill.name_product = p.name_product;
        servicesdaily.push({ ...dataBill })
      })
      servicesdaily = servicesdaily.sort((a, b) => a.id_bill - b.id_bill)/* .sort((a, b) => a.num_order - b.num_order) */
    })
    return servicesdaily

  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}



module.exports = {
  createServiceDone,
  getDailyServices,
}


/* filters={
  bill_date: {[Op.between]: [fecha1, fecha2]}

}  */