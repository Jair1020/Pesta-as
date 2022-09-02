const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "serviceDone",
    {
      sale:{
        type: DataTypes.INTEGER,
      },
      amount:{
        type: DataTypes.INTEGER,
      },
      price:{
        type: DataTypes.INTEGER,
      },
      num_order:{
        type:DataTypes.INTEGER,
      }
    },
    {
      timestamps: false,
    }
  );
};

// [
//   [1]   {
//   [1]     id: 1,
//   [1]     sale: 0,
//   [1]     amount: 1,
//   [1]     price: 900000,
//   [1]     num_order: 0,
//   [1]     serviceId: 5,
//   [1]     stylistId: '5050215180',
//   [1]     billId: 201,
//   [1]     service: {
//   [1]       id: 5,
//   [1]       name_service: 'Cejas Semipermanentes cuchilla',
//   [1]       price: '900000',
//   [1]       disabled: false,
//   [1]       categoryId: 4
//   [1]     },
//   [1]     stylist: {
//   [1]       id: '5050215180',
//   [1]       name_stylist: 'Eclis Fernanda Romeo Guzman',
//   [1]       email: 'eclisfernanda@gmail.com',
//   [1]       phone: '3503956190'
//   [1]     }
//   [1]   }
//   [1] ]



// servicesfiltro [
//   [1]   {
//   [1]     id: 101,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 102,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 103,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 104,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 105,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 106,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 107,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 108,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 109,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transferBanc: null,
//   [1]     card: null,
//   [1]     clientId: '1010215141',
//   [1]     client: {
//   [1]       id: '1010215141',
//   [1]       name_client: 'Jair Avila',
//   [1]       email: 'jair@gmail.com',
//   [1]       phone: null
//   [1]     },
//   [1]     serviceDones: [],
//   [1]     products: []
//   [1]   },
//   [1]   {
//   [1]     id: 110,
//   [1]     bill_date: '2022-09-01',
//   [1]     status: 'proceso',
//   [1]     observations: '',
//   [1]     total_price: null,
//   [1]     debt: null,
//   [1]     catch: null,
//   [1]     transferDav: null,
//   [1]     transfe