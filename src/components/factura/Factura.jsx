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
import Dropdown from "./Dropdown";
import ButtonSave from "./buttons/ButtonSave";
import ButtonBilling from "./buttons/ButtonBilling";
import Swal from "sweetalert2";
const ipcRenderer = window.ipcRenderer;

export default function Factura() {
  const [billProcess, setBillProcess] = useState([]);
  const [client, setClient] = useState({});
  const [services, setServices] = useState([{}, {}, {}, {}]);
  const [bill, setBill] = useState({});
  const [saveBill, setSaveBill] = useState(bill.id ? true : false);
  const [billUpdated, setBillUpdated] = useState(true);

  let traerBillsProcess = async () => {
    let billsProcess = await ipcRenderer.invoke("GET_BILLS_PROCESS");
    let newBill = { client: {}, bill: {}, service: [{}, {}, {}, {}] };
    setBillProcess([newBill, ...billsProcess]);
  };

  useEffect(() => {
    traerBillsProcess();
  }, []);

  useEffect(() => {
    let emptyField = services.reduce((acc, e) => {
      acc = acc + (e.id ? 0 : 1);
      return acc;
    }, 0);
    if (!emptyField) {
      setServices((s) => [...s, {}]);
    }
  }, [services]);

  useEffect(() => {
    if (billUpdated && client.id) {
      setBillUpdated(false);
    }
  }, [bill, services]);

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
      console.log("createClient", createclient);
      let createBill = await ipcRenderer.invoke("CREATE_BILL", {
        bill_date: new Date(Date.now()),
        id_client: client.id,
      });
      setBill(createBill);
      setSaveBill(true);
      setTimeout(() => {
        setBillUpdated(true);
      }, 500);
    }
  };
  const billSave = async ({ status }) => {
    let flag = services.reduce((acc, e) => {
      if (e.service && !e.id_stylist) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    if (flag) {
      return Toast.fire({
        icon: "warning",
        title: "Selecciona la estilista para los servicios",
      });
    }
    let info = {
      services: { services, id_bill: bill.id },
      bill: {
        id_bill: bill.id,
        catch: bill.catch,
        transferDav: bill.transferDav,
        transferBanc: bill.transferBanc,
        card: bill.card,
        total_price: bill.total_price,
        debt: bill.debt,
        observations: bill.observations,
      },
    };
    if (status) {
      info.bill.status = status;
    }
    try {
      const billSave = await ipcRenderer.invoke("SAVE_BILL", info);
      let servicesSaved = [...services].map((e) => {
        let service = { ...e };
        if (service.id) service.saved = true;
        billSave.forEach((b) => {
          if (b.id_service === parseInt(e.id) && e.service) {
            service.id_Done = b.id_Done;
          }
        });
        return service;
      });
      setServices((e) => servicesSaved);
      traerBillsProcess();
      setTimeout(() => {
        setBillUpdated(true);
      }, 500);
      Toast.fire({
        icon: "success",
        title: "Guardado",
      });
    } catch (err) {
      console.log(err);
      return Toast.fire({
        icon: "error",
        title: "Ocurrio un error al guardar la factura",
      });
    }
  };
  const onHandlerBillProcess = (e) => {
    if (billUpdated) {
      const billProcesss = billProcess.find(
        (b) =>
          parseInt(b.bill.id) === parseInt(e.target.id) ||
          (b.bill.id === undefined && e.target.id === "")
      );
      setBill((e) => billProcesss.bill);
      setServices((e) => billProcesss.service);
      setClient((e) => billProcesss.client);
      if (e.target.id !== "") {
        setSaveBill(true);
      } else {
        setSaveBill(false);
      }
      setTimeout(() => {
        setBillUpdated(true);
      }, 500);
      console.log(services);
    } else {
      Toast.fire({
        icon: "warning",
        title: "Guarda primero los cambios",
      });
    }
  };
  const facturar = async () => {
    if (!billUpdated) {
      return Toast.fire({
        icon: "warning",
        title: "Guarda primero los cambios",
      });
    }
    if (!bill.total_price) {
      Toast.fire({
        icon: "warning",
        title: "Agregar servicios",
      });
    } else if (bill.debt) {
      Swal.fire({
        title: "Factura con saldo pendiente",
        text: "Se pasara la factura a estado pendiente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Porfavor Especifica la razón y el plazo de pago, ",
            inputPlaceholder: "Comentarios...",
            inputAttributes: {
              "aria-label": "Porfavor Especifica la razón y el plazo de pago. ",
            },
            color:'red',
            showCancelButton: true,
          });
          if (text) {
            let obs = bill.observations;
            obs = `${bill.observations}\n \n ${text}`;
            setBill((b) => ({ ...b, observations: obs }));
          }
          await billSave({ status: "pendiente" });
          Swal.fire(
            "Pendiente!",
            "La factura queda en estado pendiente.",
            "success"
          );
          onHandlerBillProcess({ target: { id: "" } });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Factura aprobada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className={S.maincont}>
      <div>
        <div className={S.cont}>
          <div className={S.dropBillProcess}>
            <Dropdown
              billProcess={true}
              options={billProcess
                .map((e) => {
                  return { name: e.client.name_client, id: e.bill.id };
                })
                .filter((e) => e.id !== bill.id)}
              onHandlerOption={onHandlerBillProcess}
              traerBillsProcess={traerBillsProcess}
            />
          </div>
          <HeaderFact bill={bill} setBill={setBill} />
          <DataClient
            client={client}
            setClient={setClient}
            saveBill={saveBill}
          />
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
      </div>
      <div className={S.contButtons}>
        {!saveBill ? (
          <ButtonCreate createBill={createBill} />
        ) : (
          <>
            <ButtonSave billSave={billSave} />
            <ButtonBilling facturar={facturar} />
          </>
        )}
      </div>
    </div>
  );
}
