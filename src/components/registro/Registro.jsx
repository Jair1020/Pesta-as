import React, { useEffect, useState } from "react";
import HeaderRegistro from "./headerRegistro/HeaderRegistro";
import ModalBill from "./modalBill/ModalBill";
import S from "./registro.module.css";
import RowRegistro from "./rowRegistro/RowRegistro";
const ipcRenderer = window.ipcRenderer;


export default function Registro() {
  const [dailyServices, setDailyServices] = useState ([])
  const [modal, setModal] = useState ({
    state:false
  })
  
  useEffect (()=>{
    const getDailyServices = async ()=>{
      let dailyService= await ipcRenderer.invoke("GET_DAILY_SERVICES");
      setDailyServices (dailyService)
    }
    getDailyServices ()
  },[])
  const seeBill= async (idBill)=>{
    let billFound = await ipcRenderer.invoke("GET_ONE_BILL", idBill);
    if (billFound) {
      let bill= {
        bill: billFound.bill,
        services : billFound.service,
        client : billFound.client,
        state: true
      }
      setModal (bill)
    }
  }



  return (
    <div className={S.contRegistro}>
      <HeaderRegistro />
      <RowRegistro dailyServices={dailyServices} seeBill={seeBill} />
      {modal.state && <ModalBill client={modal.client} bill={modal.bill} services={modal.services} setModal={setModal} />}
    </div>
  );
}
