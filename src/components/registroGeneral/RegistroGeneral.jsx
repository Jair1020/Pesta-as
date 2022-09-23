import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../../assets/Img/settings.png";
import { filterServ, gainStylist, valUnitarios } from "../../helpers/filters";
import ModalBill from "../registro/modalBill/ModalBill";
import Filters from "./filters/Filters";
import S from "./registroGeneral.module.css";
import Table from "./table/Table";
const ipcRenderer = window.ipcRenderer;

export default function RegistroGeneral() {
  let navigate = useNavigate();
  const [dates, setDates] = useState([
    moment(new Date()).format("YYYY-MM-DD"),
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [services, setservices] = useState([]);
  const [values, setValues] = useState([]);
  const [filterServices, setFilterservices] = useState({});
  const [filterStylists, setFilterStylists] = useState({});
  const [gainStylists, setGainStylists] = useState ([])
  const [modal, setModal] = useState ({
    state:false
  })
  const getInfoGeneral = async () => {
    let bills = await ipcRenderer.invoke("GET_GENERAL_BILLS", dates);
    let expenses = await ipcRenderer.invoke("GET_GENERAL_EXPENSES", dates);
    let values = valUnitarios({ services: bills, expenses });
    // console.log(values);
    setValues(values);
    let serviceFilters= filterServ ({filterServices, filterStylists,services:bills })
    setservices (serviceFilters)
    let gainSty= gainStylist ({serviceFilters})
    console.log (serviceFilters)
    console.log (gainSty)
    setGainStylists (gainSty)

  };

  useEffect(() => {
    getInfoGeneral();
  }, []);
  const onHandlerFilter = async () => {
    await getInfoGeneral();
  };

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
    <div className={S.cont}>
      <img
        className={S.iconSettings}
        onClick={() => navigate("/settings")}
        src={settings}
        alt=""
      />
      <Filters
        dates={dates}
        setDates={setDates}
        onHandlerFilter={onHandlerFilter}
        filterServices={filterServices}
        setFilterservices={setFilterservices}
        filterStylists={filterStylists}
        setFilterStylists={setFilterStylists}
      />
      <Table values={values} services={services} gainStylists={gainStylists} seeBill={seeBill}  />
      {modal.state && <ModalBill client={modal.client} bill={modal.bill} services={modal.services} setModal={setModal} />}
    </div>
  );
}
