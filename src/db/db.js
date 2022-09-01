const { Sequelize } = require('sequelize')
const fs = require("fs");
const path = require("path");


const sequelize = new Sequelize({
  dialect:'sqlite',
  storage: 'path/to/database.sqlite',
  logging: false,
  query: { raw: true }
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, Service, Bill, Client, ServiceDone, Stylist, Product_Bill } = sequelize.models;
// console.log (sequelize.models)

Category.hasMany(Product);
Product.belongsTo(Category);

Category.hasMany(Service);
Service.belongsTo(Category);

Product.belongsToMany(Bill, { through: Product_Bill });
Bill.belongsToMany(Product, { through: Product_Bill });

Client.hasMany(Bill);
Bill.belongsTo(Client);

Service.hasMany(ServiceDone);
ServiceDone.belongsTo(Service);

Stylist.hasMany(ServiceDone);
ServiceDone.belongsTo(Stylist);

Bill.hasMany(ServiceDone);
ServiceDone.belongsTo(Bill);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}