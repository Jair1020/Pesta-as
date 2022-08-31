const { Bill, ServiceDone, Service, Client, Product, Stylist } = require("../db")

const createBill = async (bill) => {
  try {
    const newBill = await Bill.create(bill
    )
    await newBill.setClient(bill.id_client)

    return newBill.get({ plain: true })

  } catch (err) {
    console.log(err)
    return 'Ocurrio un error al crear la factura'
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


    const b = bills.map((e)=>{
      let bill= {
        id:e.id,
        bill_date:e.bill_date,
        observations:e.observations,
        total_price:e.total_price,
        debt:e.debt,
        catch:e.catch,
        transferDav:e.transferDav,
        transferBanc:e.transferBanc,
        card:e.card
      }
      let client= e.client
      let servicess = e.serviceDones.map((e)=>{
        return {
          id_Done: e.id,
          sale:e.sale,
          amount:e.amount,
          price_Total:e.price,
          num_order:e.num_order,
          id: e.serviceId,
          id_stylist:e.stylistId,
          name_service: e.service.name_service,
          name:e.service.name_service,
          price:e.service.price,
          name_stylist: e.stylist.name_stylist,
          service:true,
          saved:true
        }
      }) 
      let products= e.products.map (e=>{
        return{
          id:e.id,
          name_product:e.name_product,
          price:e.price,
          sale:e.product_Bill.sale,
          amount:e.product_Bill.amount,
          price_Total:e.product_Bill.price,
          num_order:e.product_Bill.num_order,
          service:false,
          saved:true,
          name:e.name_product,
        }
      })
      let service= [...servicess,...products].sort ((a,b)=>a.num_order-b.num_order)

      return {bill,client,service}
    })

    return b

  } catch (err) {
    console.log(err)
    return 'Ocurrio un error al obtener las facturas en proceso'
  }

}
// getBillsProcess()

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
    return 'Ocurrio un error al guardar la factura'
  }



}


module.exports = {
  createBill,
  getBillsProcess,
  updateBill
}