/* const { ipcRender, contextBridge} = require ('electron')


const WINDOW_API = {
  hola: (message)=> ipcRender.send ('hola', message),
  bye: (message)=> ipcRender.send ('bye', message)
}

contextBridge.exposeInMainWorld ("api", WINDOW_API ) */

window.ipcRenderer = require('electron').ipcRenderer;


