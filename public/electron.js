const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');

const { conn } = require('../src/db/db.js');

const { getServices, updateService, createService, getAllServices } = require('../src/db/requests/Services');
const { getStylists, updateStylist, createStylist, getPercentages, updatePercentage, getAllStylists } = require('../src/db/requests/Stylist');
const { createClient, getOneClient, getBillsClient, updateObs, searchName, updateID } = require('../src/db/requests/Client');
const { createBill, getBillsProcess, updateBill, getOneBill, getBills } = require('../src/db/requests/Bill');
const { getProducts, updateProduct, createProduct, getAllProducts } = require('../src/db/requests/Products');
const { createServiceDone, getDailyServices } = require('../src/db/requests/ServiceDone');
const {
  loadServices,
  loadProducts,
  loadCategories,
  loadStylist,
  verifyDb,
  createPassword,
  loadDates,
} = require('../src/db/datamockDb.js')

const isDev = require('electron-is-dev');
const { verifyPassword } = require('../src/db/requests/Password.js');
const { getCategories } = require('../src/db/requests/Categories.js');
const { createExpense, getExpenseDaily, getExpenses } = require('../src/db/requests/Expense.js');
const { createBillChange, getBillChanges } = require('../src/db/requests/BillChange.js');
const { sendMail } = require('../src/db/mail.js');


conn.sync(/* { force: true } */).then(async () => {
  try {
    const verify = await verifyDb()
    if (!verify.length) {
      console.log('cargando...')
      await loadCategories();
      await loadProducts();
      await loadServices();
      await loadStylist();
      await createPassword('a')
    }
  } catch (err) {
    console.log(err)
  }
})


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 700,
    minHeight: 500,
    // closable:false,
    title: "Pestañas",
    icon: __dirname + '/favicon.ico',
    center: true,
    show: false,
    // backgroundColor:'#f9c8c8',
    // frame:false,
    // autoHideMenuBar: true,
    useContentSize: true,
    simpleFullscreen: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, "../build/index.html")}`
  )
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}


app.on('ready', createWindow)



// HANDLERS IPC

ipcMain.handle('GET_SERVICES', async (event, arg) => {
  let services = await getServices()
  return services
})
ipcMain.handle('GET_ALL_SERVICES', async (event, arg) => {
  let services = await getAllServices()
  return services
})

ipcMain.handle('GET_PRODUCTS', async (event, arg) => {
  let products = await getProducts()
  return products
})
ipcMain.handle('GET_ALL_PRODUCTS', async (event, arg) => {
  let products = await getAllProducts()
  return products
})

ipcMain.handle('GET_CATEGORIES', async (event, arg) => {
  let categories = await getCategories()
  return categories
})

ipcMain.handle('GET_STYLISTS', async (event, arg) => {
  let stylists = await getStylists()
  return stylists
})

ipcMain.handle('GET_ALL_STYLISTS', async (event, arg) => {
  let stylists = await getAllStylists()
  return stylists
})


ipcMain.handle('CREATE_CLIENT', async (event, arg) => {
  let client = await createClient(arg)
  return client
})

ipcMain.handle('CREATE_BILL', async (event, arg) => {
  let bill = await createBill(arg)
  return bill
})

ipcMain.handle('GET_ONE_CLIENT', async (event, arg) => {
  let client = await getOneClient(arg)
  return client
})
ipcMain.handle('GET_ONE_BILL', async (event, arg) => {
  let bill = await getOneBill(arg)
  return bill
})

ipcMain.handle('GET_BILLS_PROCESS', async (event, arg) => {
  let billsProcess = await getBillsProcess()
  return billsProcess
})

ipcMain.handle('SAVE_BILL', async (event, arg) => {
  try {
    let servicesDone = await createServiceDone(arg.services)
    let updateBilll = await updateBill(arg.bill)
    return servicesDone ? servicesDone : []
  } catch (err) {
    console.log(err)
    return err
  }
})

ipcMain.handle('VERIFY_PASS', async (event, arg) => {
  try {
    let verify = await verifyPassword(arg)
    return verify
  } catch (err) {
    console.log(err)
    return err
  }
})

ipcMain.handle('GET_DAILY_SERVICES', async (event, arg) => {
  try {
    let dailyServices = await getDailyServices()
    return dailyServices
  } catch (err) {
    console.error(err)
    return err
  }
})

ipcMain.handle('UPDATE_PRODUCT', async (event, arg) => {
  try {
    let updatedProduct = await updateProduct(arg)
    return updatedProduct
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('UPDATE_SERVICE', async (event, arg) => {
  try {
    let updatedService = await updateService(arg)
    return updatedService
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('UPDATE_STYLIST', async (event, arg) => {
  try {
    let updatedStylist = await updateStylist(arg)
    return updatedStylist
  } catch (err) {
    console.error(err)
    return err
  }
})


ipcMain.handle('ADD_PRODUCT', async (event, arg) => {
  try {
    let newProduct = await createProduct(arg)
    return newProduct
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('ADD_SERVICE', async (event, arg) => {
  try {
    let newService = await createService(arg)
    return newService
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('ADD_STYLIST', async (event, arg) => {
  try {
    let newStylist = await createStylist(arg)
    return newStylist
  } catch (err) {
    console.error(err)
    return err
  }
})

ipcMain.handle('GET_LAST_BILL_CLIENT', async (event, arg) => {
  try {
    let Bills = await getBillsClient(arg)
    return Bills
  } catch (err) {
    return err
  }
})

ipcMain.handle('CREATE_EXPENSE', async (event, arg) => {
  try {
    let newExpense = await createExpense(arg)
    return (newExpense)
  } catch (err) {
    return err
  }
})

ipcMain.handle('GET_PERCENTAGE_STYLIST', async (event, arg) => {
  try {
    let percentages = await getPercentages(arg)
    return percentages
  } catch (err) {
    return err
  }
})

ipcMain.handle('UPDATE_PERCENTAGE_STYLIST', async (event, arg) => {
  try {
    let update = await updatePercentage(arg)
    return update
  } catch (err) {
    return err
  }
})

ipcMain.handle('GET_EXPENSE_DAILY', async (event, arg) => {
  try {
    let expenses = await getExpenseDaily()
    return expenses
  } catch (err) {
    return err
  }
})
ipcMain.handle('GET_GENERAL_EXPENSES', async (event, arg) => {
  try {
    let expenses = await getExpenses (arg)
    return expenses
  } catch (err) {
    return err
  }
})

ipcMain.handle('UPDATE_OBS_CLIENT', async (event, arg) => {
  try {
    let updated = await updateObs(arg)
  } catch (err) {
    return (err)
  }
})


ipcMain.handle('SEARCH_CLIENT_NAME', async (event, arg) => {
  try {
    let clients = await searchName(arg)
    return clients
  } catch (err) {
    return err
  }
})

ipcMain.handle('CREATE_BILL_CHANGE', async (event, arg) => {
  try {
    let changes = await createBillChange(arg)
    return changes
  } catch (err) {
    return err
  }
})
ipcMain.handle('GET_BILL_CHANGE', async (event, arg) => {
  try {
    let changes = await getBillChanges()
    return changes
  } catch (err) {
    return err
  }
})

ipcMain.handle ('GET_GENERAL_BILLS', async (event, arg)=>{
  try{
    let bills= await getBills (arg)
    return bills
  }catch (err){
    return err
  }
})
 
ipcMain.handle ('UPDATE_IDCLIENT', async (event, arg)=>{
  try{
    let updateClient = await updateID (arg)
    return updateClient
  }catch (err){
    return err
  }
})

ipcMain.handle ('SEND_MAIL',  (event,arg)=>{
 try{
  let mail = sendMail (arg)
  return mail
 }catch (err){
  return err
 }
})

//----------------------------------------------//


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // const child = new BrowserWindow({ modal: true, show: false })
    // child.loadURL (`file://${path.join(__dirname, "modal.html")}`)
    // child.once('ready-to-show', () => {
    //   child.show()
    // })
    app.quit()
  }
})