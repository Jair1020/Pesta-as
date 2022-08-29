const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');
const { getServices } = require('../src/db/requests/Services');
const { getStylists } = require('../src/db/requests/Stylist');
const { createClient, getOneClient } = require('../src/db/requests/Client');
const { createBill } = require('../src/db/requests/Bill');
const { getProducts } = require('../src/db/requests/Products');




function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    center:true,
    useContentSize:true,
    simpleFullscreen:true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }
}


app.on('ready', createWindow)


// HANDLERS IPC

ipcMain.handle('GET_SERVICES', async (event, arg) => {
  let services = await getServices()
  return services
})

ipcMain.handle('GET_PRODUCTS', async (event, arg) => {
  let products = await getProducts ()
  return products
})

ipcMain.handle('GET_STYLISTS', async (event, arg) => {
  let stylists = await getStylists()
  return stylists
})

ipcMain.handle ('CREATE_CLIENT', async (event,arg)=>{
  let client = await createClient (arg)
  return client
})

ipcMain.handle ('CREATE_BILL', async (event, arg) =>{
  let bill = await createBill (arg)
  return bill
})

ipcMain.handle ('GET_ONE_CLIENT', async (event, arg) =>{
  let client = await getOneClient (arg)
  return client
})





//----------------------------------------------//


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})