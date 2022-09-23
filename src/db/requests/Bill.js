const { Op } = require("sequelize")
const { Bill, ServiceDone, Service, Client, Product, Stylist,Stylist_Category } = require("../db")

const createBill = async (bill) => {
  try {
    const lastbills = await Bill.findOne()
    if (!lastbills) bill.id = 10000
    const newBill = await Bill.create(bill
    )
    await newBill.setClient(bill.id_client)

    return newBill.get({ plain: true })

  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al crear la factura')
  }
}


const getBillsProcess = async () => {
  try {
    const billsProcess = await Bill.findAll({
      raw: false,
      where: {
        status: 'proceso'
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
    let bills = JSON.parse(JSON.stringify(billsProcess))


    const b = bills.map((e) => {
      let bill = {
        id: e.id,
        bill_date: e.bill_date,
        observations: e.observations,
        total_price: e.total_price,
        debt: e.debt,
        catch: e.catch,
        transferDav: e.transferDav,
        transferBanc: e.transferBanc,
        card: e.card,
        status: e.status
      }
      let client = e.client
      let servicess = e.serviceDones.map((e) => {
        return {
          id_Done: e.id,
          sale: e.sale,
          amount: e.amount,
          price_Total: e.price_Total,
          num_order: e.num_order,
          id: e.serviceId,
          id_stylist: e.stylistId,
          name_service: e.service.name_service,
          name: e.service.name_service,
          price: e.price,
          name_stylist: e.stylist.name_stylist,
          service: true,
          saved: true
        }
      })
      let products = e.products.map(e => {
        return {
          id: e.id,
          name_product: e.name_product,
          price: e.product_Bill.price,
          sale: e.product_Bill.sale,
          amount: e.product_Bill.amount,
          price_Total: e.product_Bill.price_Total,
          num_order: e.product_Bill.num_order,
          service: false,
          saved: true,
          name: e.name_product,
        }
      })
      let service = [...servicess, ...products].sort((a, b) => a.num_order - b.num_order)

      return { bill, client, service }
    })

    return b

  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al obtener las facturas en proceso')
  }

}

const updateBill = async (bill) => {
  try {
    const updatedBill = await Bill.update(bill, {
      raw: true,
      where: {
        id: bill.id_bill
      }
    })

  } catch (err) {
    console.log(err)
    throw new Error('Ocurrio un error al guardar la factura')
  }
}

const getOneBill = async (id) => {
  try {
    const billFound = await Bill.findByPk(id, {
      raw: false,
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
    if (!billFound) return null
    let billFoundTOLook = JSON.parse(JSON.stringify(billFound))
    let bill = {
      id: billFoundTOLook.id,
      bill_date: billFoundTOLook.bill_date,
      observations: billFoundTOLook.observations,
      total_price: billFoundTOLook.total_price,
      debt: billFoundTOLook.debt,
      catch: billFoundTOLook.catch,
      transferDav: billFoundTOLook.transferDav,
      transferBanc: billFoundTOLook.transferBanc,
      card: billFoundTOLook.card,
      status: billFoundTOLook.status
    }
    let client = billFoundTOLook.client

    let servicess = billFoundTOLook.serviceDones.map((e) => {
      return {
        id_Done: e.id,
        sale: e.sale,
        amount: e.amount,
        price_Total: e.price_Total,
        num_order: e.num_order,
        id: e.serviceId,
        id_stylist: e.stylistId,
        name_service: e.service.name_service,
        name: e.service.name_service,
        price: e.price,
        name_stylist: e.stylist.name_stylist,
        service: true,
        saved: true
      }
    })
    let products = billFoundTOLook.products.map(e => {
      return {
        id: e.id,
        name_product: e.name_product,
        price: e.product_Bill.price,
        sale: e.product_Bill.sale,
        amount: e.product_Bill.amount,
        price_Total: e.product_Bill.price_Total,
        num_order: e.product_Bill.num_order,
        service: false,
        saved: true,
        name: e.name_product,
      }
    })
    let service = [...servicess, ...products]/* .sort((a, b) => a.num_order - b.num_order)
 */
    return { bill, client, service }

  } catch (err) {
    console.log(err)
    throw new Error('Error al Obtener la Factura')
  }
}
const getBills = async (date) => {
  try {
    const bills = await Bill.findAll({
      raw: false,
      where: {
        bill_date:{
          [Op.between]: date
        },
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
    throw new Error('Error al obtener los servicios')
  }
}

module.exports = {
  createBill,
  getBillsProcess,
  updateBill,
  getOneBill,
  getBills
}