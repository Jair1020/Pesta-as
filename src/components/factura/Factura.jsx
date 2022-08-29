import React, { useEffect, useState } from "react";
import ButtonCreate from "./buttons/ButtonCreate";
import DataClient from "./DataClient";
import S from "./factura.module.css";
import HeaderFact from "./TablaFact/HeaderFact";
import HeaderTabla from "./TablaFact/HeaderTabla";
import { clientVal } from "./validations/clientVal";
import { Toast } from "../features.js/Toast";
import Count from "./TablaFact/Count";
import Row from "./TablaFact/Row";
const ipcRenderer = window.ipcRenderer;

export default function Factura() {
  const [client, setClient] = useState({});
  const [services, setServices] = useState([{}, {}, {}, {}]);
  const [bill, setBill] = useState({});
  const [saveBill, setSaveBill] = useState(bill.id ? true : false);

  const createBill = async () => {
    let errors = clientVal(client);
    if (Object.keys(errors).length) {
      Toast.fire({
        icon: "error",
        title: Object.values(errors)[0],
      });
    } else {
      // setBill ({bill_date:new Date(Date.now())})}
      let createclient = await ipcRenderer.invoke("CREATE_CLIENT", client);
      console.log(createclient);
      let createBill = await ipcRenderer.invoke("CREATE_BILL", {
        bill_date: new Date(Date.now()),
        id_client: client.id,
      });
      console.log(createBill);
      setBill(createBill);
      setSaveBill(true);
    }
  };

  return (
    <div className={S.maincont}>
      <div className={S.cont}>
        <HeaderFact bill={bill} setBill={setBill} />
        <DataClient client={client} setClient={setClient} saveBill={saveBill} />
        <HeaderTabla />
        <Row
          saveBill={saveBill}
          services={services}
          setServices={setServices}
        />
        <Count
          saveBill={saveBill}
          bill={bill}
          setBill={setBill}
          services={services}
        />
      </div>
      {!saveBill ? <ButtonCreate createBill={createBill} /> : null}
    </div>
  );
}
