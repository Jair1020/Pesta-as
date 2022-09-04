const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');

const { conn } = require('../src/db/db.js');

const { getServices, updateService, createService } = require('../src/db/requests/Services');
const { getStylists, updateStylist, createStylist } = require('../src/db/requests/Stylist');
const { createClient, getOneClient } = require('../src/db/requests/Client');
const { createBill, getBillsProcess, updateBill, getOneBill } = require('../src/db/requests/Bill');
const { getProducts, updateProduct, createProduct } = require('../src/db/requests/Products');
const { createServiceDone, getDailyServices } = require('../src/db/requests/ServiceDone');
const {
  loadServices,
  loadProducts,
  loadCategories,
  loadStylist,
  verifyDb,
  createPassword,
  loadDates } = require('../src/db/datamockDb.js')

const isDev = require('electron-is-dev');
const { verifyPassword } = require('../src/db/requests/Password.js');
const { getCategories } = require('../src/db/requests/Categories.js');



conn.sync({force:true}).then(async () => {
  try {
    const verify = await verifyDb()
    if (!verify.length) {
      console.log('cargando...')
      await loadCategories();
      await loadProducts();
      await loadServices();
      await loadStylist();
      await createPassword('alejoVictoria')
      // await loadDates ()
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

ipcMain.handle('GET_PRODUCTS', async (event, arg) => {
  let products = await getProducts()
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
    let updatedProduct = await updateProduct (arg)
    return updatedProduct
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('UPDATE_SERVICE', async (event, arg) => {
  try {
    let updatedService = await updateService (arg)
    return updatedService
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('UPDATE_STYLIST', async (event, arg) => {
  try {
    let updatedStylist = await updateStylist (arg)
    return updatedStylist
  } catch (err) {
    console.error(err)
    return err
  }
})


ipcMain.handle('ADD_PRODUCT', async (event, arg) => {
  try {
    let newProduct = await createProduct (arg)
    return newProduct
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('ADD_SERVICE', async (event, arg) => {
  try {
    let newService = await createService (arg)
    return newService
  } catch (err) {
    console.error(err)
    return err
  }
})
ipcMain.handle('ADD_STYLIST', async (event, arg) => {
  try {
    let newStylist = await createStylist (arg)
    return newStylist
  } catch (err) {
    console.error(err)
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