const path = require ('path')
const {app, BrowserWindow} = require ('electron')

console.log ('entra')
function createWindow(){
  const mainWindow = new BrowserWindow ({
    width:800,
    height:600,
    webPreferences:{
      nodeIntegration:true,
    }
  })
  if (app.isPackaged){
    mainWindow.loadFile (path.join(__dirname, "../build/index.html"));
  }else {
    mainWindow.loadURL('http://localhost:3000')
  }
}


app.on ('ready', createWindow)

app.on ('window-all-closed', ()=>{
  if (process.platform !== 'darwin'){
    app.quit ()
  }
})