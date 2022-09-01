const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');

const { conn } = require('../src/db/db.js');

const { getServices } = require('../src/db/requests/Services');
const { getStylists } = require('../src/db/requests/Stylist');
const { createClient, getOneClient } = require('../src/db/requests/Client');
const { createBill, getBillsProcess, updateBill } = require('../src/db/requests/Bill');
const { getProducts } = require('../src/db/requests/Products');
const { createServiceDone } = require('../src/db/requests/ServiceDone');
const {
  loadServices,
  loadProducts,
  loadCategories,
  loadStylist,
  verifyDb } = require('../src/db/datamockDb.js')

const isDev = require('electron-is-dev')


conn.sync(/* {force:true} */).then(async () => {
  try {
    const verify = await verifyDb ()
    if (!verify.length) {
      console.log ('cargando...')
      await loadCategories();
      await loadProducts();
      await loadServices();
      await loadStylist();
    }
  } catch (err) {
    console.log(err)
  }
})


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    center: true,
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
}


// app.on('ready', createWindow)
win.once('ready-to-show', () => {
  win.show()
})

// HANDLERS IPC

ipcMain.handle('GET_SERVICES', async (event, arg) => {
  let services = await getServices()
  return services
})

ipcMain.handle('GET_PRODUCTS', async (event, arg) => {
  let products = await getProducts()
  return products
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



//----------------------------------------------//


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})