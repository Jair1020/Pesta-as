import React, { useState } from "react";
import S from './modalExpense.module.css'
import x from '../../../assets/Img/x.svg'
import { Toast } from "../../features.js/Toast";
const ipcRenderer = window.ipcRenderer;


export default function ModalExpense({setModalExpense}) {
  const [input, setInput] = useState ({})
  
  const onHandlerInput = (e)=>{
    if (e.target.name==='expense_price'){
      let number = parseInt(e.target.value.replace(/[.]/g, ""))
      if (number<0 || isNaN(number)){
        number = 0
      }else if (number > 10000000) {
        number = 10000000;
      }
      setInput (i=>({...i, expense_price:number}))
    }else {
      setInput (i=>({...i, expense_reason:e.target.value}))  
    }
  }
  const saveExpense = async ()=>{
    if (!input.expense_price || !input.expense_reason){
      return Toast.fire({
        icon: "warning",
        title: "Completa todos los campos",
      });
    }
    let expense= {...input, expense_date:new Date(Date.now())}
    let report = await ipcRenderer.invoke("CREATE_EXPENSE", expense );
    if (report===true){
      Toast.fire({
        icon: 'success',
        title: "Reporte creado",
      });
      setModalExpense (false)
    }else{
      Toast.fire({
        icon: "error",
        title: "Ocurrio un error en el reporte",
      });
    }
  }



  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <img
            onClick={() => setModalExpense(false )}
            className={S.volver}
            src={x}
            alt=""
          />
          <div className={S.maincont}>
            <span>Reporte Gasto</span>
            <div>
              <label>Razón del Gasto</label>
              <textarea name="expense_reason" onChange={onHandlerInput} value={input.expense_reason} />
            </div>
            <div>
              <label>Precio</label>
              <input onChange={onHandlerInput} value={input.expense_price?new Intl.NumberFormat("de-DE").format(input.expense_price):''} name='expense_price' type="text"/>
            </div>
            <button onClick={saveExpense} >Guardar</button>
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  );
}
