const { conn } = require("./db");
const {
  loadServices,
  loadProducts,
  loadCategories, 
  loadStylist} = require("./datamockDb")


conn.sync({ force: true }).then(async () => {
  try {
    await loadCategories();
    await loadProducts();
    await loadServices();
    await loadStylist();
  } catch (err) {
    console.log(err)
  }
})