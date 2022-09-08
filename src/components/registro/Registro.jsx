import React, { useEffect, useState } from "react";
import HeaderRegistro from "./headerRegistro/HeaderRegistro";
import ModalBill from "./modalBill/ModalBill";
import S from "./registro.module.css";
import RowRegistro from "./rowRegistro/RowRegistro";
import expense from '../../assets/Img/expense.png'
import ModalExpense from "./modalExpense/ModalExpense";
import report from '../../assets/Img/report.png'
import ReportModal from "./dailyBalance/reportModal/ReportModal";
const ipcRenderer = window.ipcRenderer;


export default function Registro() {
  const [dailyServices, setDailyServices] = useState ([])
  const [modal, setModal] = useState ({
    state:false
  })
  const [modalReport, setModalReport] = useState (false)
  const [modalExpense, setModalExpense] = useState (false)
  const [expenses, setExpenses] = useState ([])
  const [changes, setChanges] = useState ([])


  const  dailyEspense= async ()=>{
    let expenses = await ipcRenderer.invoke ('GET_EXPENSE_DAILY')  
    setExpenses (expenses)
  }

  useEffect (()=>{
    const getDailyServices = async ()=>{
      let dailyService= await ipcRenderer.invoke("GET_DAILY_SERVICES");
      let changes= await ipcRenderer.invoke("GET_BILL_CHANGE")
      setChanges (changes)
      setDailyServices (dailyService)
    }
    dailyEspense ()
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
  const onHadlerRerpot = async ()=>{
    await dailyEspense ()
    setModalReport(true)
  }

  return (
    <div className={S.contRegistro}>
      <HeaderRegistro />
      <RowRegistro dailyServices={dailyServices} seeBill={seeBill} />
      {modal.state && <ModalBill client={modal.client} bill={modal.bill} services={modal.services} setModal={setModal} />}
      <img className={S.inconExpense} src={expense} alt="" onClick={()=>setModalExpense(true)}/>
      <img className={S.inconReport} src={report} onClick={onHadlerRerpot} alt='' />
      {modalExpense && <ModalExpense setModalExpense={setModalExpense}/>}
      {modalReport && <ReportModal expenses={expenses} dailyServices={dailyServices} setModalReport={setModalReport} changes={changes} />}
    </div>
  );
}
