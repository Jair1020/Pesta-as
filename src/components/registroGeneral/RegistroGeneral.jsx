import React from 'react'
import { useNavigate } from 'react-router-dom';
import settings from '../../assets/Img/settings.png'
const ipcRenderer = window.ipcRenderer;

export default function RegistroGeneral() {
  let navigate = useNavigate();

  const prueba= async ()=>{
    let billsProcess = await ipcRenderer.invoke('GET_LAST_BILL_CLIENT', 1010215141);
    console.log (billsProcess)
  }





  return (
    <div>
      <img onClick={()=>navigate('/settings')} src={settings} alt=""/>
      <button onClick={prueba} >Click</button>
    </div>
  )
}
