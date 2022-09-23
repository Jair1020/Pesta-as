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
import { screenshot } from "../../helpers/screenshot";
import ButtonDeleteBill from "./buttons/ButtonDeleteBill";
import ButtonSearchBill from "./buttons/ButtonSearchBill";
import LastServices from "./lastService/LastServices";
import editdoc from '../../assets/Img/editdoc.png'
import moment from "moment";
import ModalChange from "./modalChange/ModalChange";
const ipcRenderer = window.ipcRenderer;

export default function Factura() {
  const [infoClient, setInfoClient] = useState([]);
  const [billProcess, setBillProcess] = useState([]);
  const [client, setClient] = useState({});
  const [services, setServices] = useState([{}, {}, {}, {}]);
  const [bill, setBill] = useState({});
  const [saveBill, setSaveBill] = useState(bill.id ? true : false);
  const [billUpdated, setBillUpdated] = useState(true);
  const [screenShot, setScreenShot] = useState(false);
  const [manyClients, setManyClients] = useState (false)
  const [changeBill,setChangeBill] = useState (false)
  const [modalChange, setModalChange] = useState (false)

  let traerBillsProcess = async () => {
    let billsProcess = await ipcRenderer.invoke("GET_BILLS_PROCESS");
    let newBill = { client: {}, bill: {}, service: [{}, {}, {}, {}] };
    setBillProcess((b) => [newBill, ...billsProcess]);
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
      await ipcRenderer.invoke("CREATE_CLIENT", client);
      let createBill = await ipcRenderer.invoke("CREATE_BILL", {
        bill_date: new Date(Date.now()),
        id_client: client.id,
      });
      setBill(createBill);
      setSaveBill(true);
      setTimeout(() => {
        setBillUpdated(true);
      }, 400);
    }
  };

  const billSave = async ({ status, obs }) => {
    let flag = services.reduce((acc, e) => {
      if (e.service && !e.id_stylist) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    if (flag) {
      return Toast.fire({
        icon: "warning",
        title: "Selecciona la esteticista para los servicios",
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
        observations: obs ? obs : bill.observations,
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
      }, 400);
      Toast.fire({
        icon: "success",
        title: "Guardado",
      });
      setChangeBill (false)
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
      }, 400);
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
            inputLabel: "Porfavor Especifica la razón y el plazo de pago:",
            inputPlaceholder: "Comentarios...",
            inputAttributes: {
              "aria-label": "Porfavor Especifique la razón y el plazo de pago:",
            },
            color: "Black",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Por Favor escribe la razón y el plazo de pago!";
              }
            },
          });
          let obs = "";
          if (text) {
            obs = bill.observations
              ? `${bill.observations}\nPendiente por:\n${text}`
              : `Pendiente por:\n${text}`;
            await billSave({ status: "pendiente", obs: obs });
            Swal.fire(
              "Pendiente!",
              "La factura queda en estado pendiente.",
              "success"
            );
            setScreenShot((e) => !e);
            setTimeout(() => {
              let name = `${bill.id}-${client.name_client}`;
              screenshot(name);
              onHandlerBillProcess({ target: { id: "" } });
              setScreenShot((e) => !e);
            }, 300);
          }
        }
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "Aprobada",
        width: "250px",
      });
      let obs = bill.observations
        ? `${bill.observations}\nAPROBADA`
        : `APROBADA`;
      await billSave({ status: "aprobada", obs: obs });
      setScreenShot((e) => !e);
      setTimeout(() => {
        let name = `${bill.id}-${client.name_client
          .split(" ")
          .slice(0, 3)
          .join(" ")}`;
        screenshot(name);
        onHandlerBillProcess({ target: { id: "" } });
        setScreenShot((e) => !e);
      }, 300);
    }
  };

  const deleteBill = async () => {
    await billSave({});
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel:
        "Porfavor Especifica la razón por la que se rechaza la factura:",
      color: "Black",
      inputPlaceholder: "Comentarios...",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Porfavor Especifica la razón por la que se rechaza la factura!";
        }
      },
    });
    if (text) {
      let obs = bill.observations
        ? `${bill.observations}\nRechazada por:\n${text}`
        : `Rechazada por:\n${text}`;
      await billSave({ status: "rechazada", obs: obs });
      onHandlerBillProcess({ target: { id: "" } });
      Swal.fire(
        "rechazada!",
        "La factura queda en estado rechazada.",
        "success"
      );
    }
  };

  const handlerSearchBill = async (id) => {
    if (!isNaN(parseInt(id)) && typeof parseInt(id) === "number") {
      let infoClient = await ipcRenderer.invoke("GET_LAST_BILL_CLIENT", id);
      if (infoClient) {
        setManyClients (false)
        setInfoClient(infoClient);
        /* Toast.fire({
          icon: "success",
          title: "Revisa el panel para ver la información",
        }); */
        if (!saveBill){
          let clientFound = await ipcRenderer.invoke("GET_ONE_CLIENT", id);
          setClient(clientFound);
        }
        /*             setBill((e) => billFound.bill);
        setServices((e) => billFound.service);
        setClient((e) => billFound.client);
        setSaveBill(true);
        setTimeout(() => {
          setBillUpdated(true);
        }, 400); */
      } else {
        Toast.fire({
          icon: "warning",
          title: "No se encontro el cliente",
        });
      }
    } else if (typeof id === "string") {
      let infoClient = await ipcRenderer.invoke("SEARCH_CLIENT_NAME", id);
      if (infoClient.length === 1) {
        Toast.fire({
          icon: "success",
          title: "Revisa el panel para ver la información",
        });
        handlerSearchBill(infoClient[0].id);
      }else if (infoClient.length > 1){
        Toast.fire({
          icon: 'info',
          title: `Se encontraron ${infoClient.length} Clientes, revisalos en el panel`,
        });
        setManyClients (true)
        setInfoClient(infoClient)
      }else if (infoClient.length===0){
        setInfoClient([])
      }
    }
  };

  const onHandlerSeeBill = async (id) => {
    let billFound = await ipcRenderer.invoke("GET_ONE_BILL", id);
    setBill((e) => billFound.bill);
    setServices((e) => billFound.service);
    setClient((e) => billFound.client);
    setSaveBill(true);
    setTimeout(() => {
      setBillUpdated(true);
    }, 400);
  };

  return (
    <div className={S.maincont}>
      <LastServices
        infoClient={infoClient}
        onHandlerSeeBill={onHandlerSeeBill}
        manyClients={manyClients}
        handlerSearchBill={handlerSearchBill}
        saveBill={saveBill}
      />
      <ButtonSearchBill handlerSearchBill={handlerSearchBill} />
      <div id="factura" className={screenShot ? S.contScreen : S.cont}>
          {bill.status === "aprobada" && moment().format('YYYY-MM-DD')===moment(bill.bill_date).format('YYYY-MM-DD') ?<img style={{position:'absolute', top:'20px', right:'20px', cursor:'pointer' }} onClick={()=>setModalChange(true)} src={editdoc} alt="" />:null}
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
        {saveBill &&
        !(
          bill.status === "rechazada" ||
          bill.status === "aprobada" ||
          bill.status === "pendiente"
        ) ? (
          <ButtonDeleteBill deleteBill={deleteBill} />
        ) : null}
        <HeaderFact bill={bill} />
        <DataClient
          client={client}
          setClient={setClient}
          saveBill={saveBill}
          screenShot={screenShot}
          setInfoClient={setInfoClient}
          setManyClients={setManyClients}handlerSearchBill={handlerSearchBill}
        />
        <HeaderTabla />
        <Row
          bill={bill}
          screenShot={screenShot}
          saveBill={saveBill}
          services={services}
          setServices={setServices}
          changeBill={changeBill}
        />
        <Count
          saveBill={saveBill}
          bill={bill}
          setBill={setBill}
          services={services}
          screenShot={screenShot}
          changeBill={changeBill}
        />
      </div>
      <div className={S.contButtons}>
        {!saveBill ? (
          <ButtonCreate createBill={createBill} />
        ) : (
          <>
            {changeBill || (bill.status !== "aprobada" && bill.status !== "rechazada") ? (
              <ButtonSave billSave={billSave} />
            ) : null}
            {bill.status !== "aprobada" && bill.status !== "rechazada" ? (
              <ButtonBilling facturar={facturar} />
            ) : null}
          </>
        )}
      </div>
      {modalChange && <ModalChange setModalChange={setModalChange} setChangeBill={setChangeBill} idBill={bill.id} />}
    </div>
  );
}
