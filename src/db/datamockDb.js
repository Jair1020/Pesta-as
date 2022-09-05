const { Category, Service, Product, Stylist, Password, Bill,Stylist_Category } = require('./db')
const { createBill } = require('./requests/Bill')
const { createClient } = require('./requests/Client')


const services = [
  { name_service: "Mantenimiento Pestañas Pelo a Pelo", price: 100000, category: ["Mantenimiento"] },
  { name_service: "Postura Pestañas Premium", price: 200000, category: ["Postura Pestañas"] },
  { name_service: "Postura Pestañas Basico", price: 300000, category: ["Postura Pestañas"] },
  { name_service: "Postura Pestañas Premium Naturales", price: 400000, category: ["Postura Pestañas"] },
  { name_service: "Postura Pestañas Vol Ruso", price: 500000, category: ["Postura Pestañas"] },
  { name_service: "Retiro de Pestañas", price: 600000, category: ["Retiro"] },
  { name_service: "Perfilación Cejas cuchilla", price: 700000, category: ["Cejas "] },
  { name_service: "Perfilación Cejas con cera", price: 800000, category: ["Cejas "] },
  { name_service: "Cejas Semipermanentes cuchilla", price: 900000, category: ["Cejas "] },
  { name_service: "Cejas Semipermanentes cera", price: 1000000, category: ["Cejas "] },
  { name_service: "Cejas Semipermanentes", price: 1100000, category: ["Cejas "] },
  { name_service: "Mapa de Cejas", price: 1200000, category: ["Especiales"] },
  { name_service: "Lifting de Pestañas", price: 1300000, category: ["Especiales"] },
  { name_service: "Laminado de Cejas", price: 1400000, category: ["Especiales"] },
  { name_service: "Depilacion Labio Superior", price: 2100000, category: ["Depilaciones"] },
  { name_service: "Depilacion Axila", price: 2200000, category: ["Depilaciones"] },
  { name_service: "Depilacion Media Pierna", price: 2300000, category: ["Depilaciones"] },
  { name_service: "Depilacion Pierna Completa", price: 2400000, category: ["Depilaciones"] },
  { name_service: "Depilacion fosas nasales", price: 2500000, category: ["Depilaciones"] },
]

const products = [
  { name_product: "Cepillo Desechables", price: 1500000, category: ["Producto"] },
  { name_product: "Cepillo de Lujo", price: 1600000, category: ["Producto"] },
  { name_product: "Espuma limpiadora", price: 1700000, category: ["Producto"] },
  { name_product: "Sellante", price: 1800000, category: ["Producto"] },
  { name_product: "Parche", price: 1900000, category: ["Producto"] },
  { name_product: "Desmaquillante", price: 2000000, category: ["Producto"] },
]

const stylists = [
  {
    id: '1010215141',
    name_stylist: "Daniela Alvarez Tovar",
    email: "daniel@gmail.com",
    phone: "3223957784"
  },
  {
    id: '1010215180',
    name_stylist: "Jhoana Lopez Tovar",
    email: "Jhoana@gmail.com",
    phone: "3123957790"
  },
  {
    id: '5050215180',
    name_stylist: "Eclis Fernanda Romeo Guzman",
    email: "eclisfernanda@gmail.com",
    phone: "3503956190"
  },
  {
    id: '9874215180',
    name_stylist: "Lineth Alvarez Cortez",
    email: "lineth@gmail.com",
    phone: "3203957778"
  },
  {
    id: '1234215180',
    name_stylist: "Giomar Tovar",
    email: "giomar@gmail.com",
    phone: "3133957654"
  },
]


const categories = [
  { name_category: "Mantenimiento" },
  { name_category: "Postura Pestañas" },
  { name_category: "Retiro" },
  { name_category: "Cejas " },
  { name_category: "Especiales" },
  { name_category: "Producto" },
  { name_category: "Depilaciones" },
]

const loadCategories = async () => {
  try {
    await Category.bulkCreate(categories);
  } catch (error) {
    return error;
  }
};

const loadServices = async () => {
  try {
    await Promise.all(services.map(async (se) => {
      var categoryy = await Category.findAll({
        where: { name_category: se.category[0].toLowerCase() },
      })

      categoryy = categoryy.flat();

      let service = await Service.create({
        name_service: se.name_service,
        price: se.price,
      });

      await service.setCategory(categoryy[0].id);
    }));
  } catch (error) {
    console.log(error);
  }
}
const loadProducts = async () => {

  await Promise.all(products?.map(async (p) => {

    var categoryy = await Category.findAll({
      where: { name_category: p.category[0].toLowerCase() },
    })
    categoryy = categoryy.flat();

    let product = await Product.create({
      name_product: p.name_product,
      price: p.price,
    });

    await product.setCategory(categoryy[0].id);
  }));
};
const loadStylist = async () => {
  let categories= await Category.findAll({raw:true})
  
  await Promise.all(stylists.map(async (s) => {
    let stylist = await Stylist.create(s)
    categories.map ((e)=>{
      if (e.name_category!=='producto'){
        stylist.addCategory (e.id)
      }
    })

  }))
}


const verifyDb = async () => {
  try {
    const verifyData = await Category.findAll()

    return verifyData

  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const createPassword = async (pass) => {
  try {
    const password = await Password.create({ password: pass })
  } catch (err) {
    console.log(err)
    return err
  }
}
const loadDates = async () => {

  let client = await createClient({
    id: 1010215141,
    name_client: 'Jair Avila',
    email: 'jair@gmail.com'
  })


  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  Date.prototype.subtractDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() - days)
    return date

  }
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
  const day = new Date().subtractDays(10)
  range(1, 20, 1).map((e, id) => {
    range(1, 10, 1).map(async (e, idx) => {
      try {
        const newBill = await Bill.create({
          bill_date: day.addDays(id),
          id_client: 1010215141,
        }
        )
        await newBill.setClient(1010215141)

      } catch (err) {
        console.log(err)
        return 'Ocurrio un error al crear la factura'
      }
    })
  })
}
const loadFirtsBill = async () => {
  try {
    let client = {
      name_client: 'Jair Avila Gómez',
      id: 1010215141
    }
    await createClient(client)
    let bill = {
      id: 1000,
      bill_date: new Date(Date.now()),
      id_client: client.id,
      status:'initial'
    }
    await createBill(bill)
  } catch (err) {
    console.log(err)
  }
}




module.exports = {
  verifyDb,
  loadCategories,
  loadServices,
  loadProducts,
  loadStylist,
  createPassword,
  loadDates,
  loadFirtsBill,
  updatePercentage
} 
