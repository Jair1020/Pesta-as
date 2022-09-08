import React, { useState } from 'react'
import S from './modalChange.module.css'
import x from '../../../assets/Img/x.svg'
import { Toast } from '../../features.js/Toast';
const ipcRenderer = window.ipcRenderer;


export default function ModalChange({setModalChange, idBill, setChangeBill  }) {
  const [input, setInput] = useState ({})

  const onHandlerInput = (e)=>{
    setInput (i=>({...i, [e.target.name]:e.target.value}))
  }

  const save = async ()=>{
    if (input.name_change && input.reasonChange ){
      let billchange = await ipcRenderer.invoke("CREATE_BILL_CHANGE", {...input, dateChange: new Date(), idBill:idBill });
      setModalChange (false)
      setChangeBill (true)
    }else {
      Toast.fire({
        icon: "warning",
        title: "Introduce tu nombre y la razón del cambio",
      });
    }
  }


  return (
    <>
    <div className={S.contMainModal}>
      <div className={S.contModal}>
        <img
          onClick={() => setModalChange(false)}
          className={S.volver}
          src={x}
          alt=""
        />
        <div className={S.maincont}>
          <span>Formulario de modificación de factura</span>
          <div>
            <label>Nombre de quien modifica</label>
            <input onChange={onHandlerInput} name='name_change' value={input.name_change?input.name_change:''} type='text' />
          </div>
          <div>
            <label>Razón del cambio y  que se va a cambiar</label>
            <textarea  onChange={onHandlerInput}  name='reasonChange' value={input.reasonChange?input.reasonChange:''} />
          </div>
          <button onClick={save} >Guardar</button>
        </div>
      </div>
    </div>
    <div className={S.modalBack}></div>
  </>
  )
}
