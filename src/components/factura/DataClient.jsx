import React from "react";
import S from "./factura.module.css";
import search from "../../assets/Img/search.png";
import { Toast } from "../features.js/Toast";
const ipcRenderer = window.ipcRenderer;

export default function DataClient({
  client,
  setClient,
  saveBill,
  screenShot,
  setInfoClient,
  setManyClients,
}) {
  const onHandlerChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  const onHandlerClick = async (e) => {
    if (e.target.id === "searchClient") {
      let clientFound = await ipcRenderer.invoke("GET_ONE_CLIENT", client.id);
      if (clientFound) {
        setClient(clientFound);
        let infoBillsClient = await ipcRenderer.invoke(
          "GET_LAST_BILL_CLIENT",
          client.id
        );
        setInfoClient(infoBillsClient);
        Toast.fire({
          icon: 'success',
          title: "Cliente encontrado",
        })
      } else {
        Toast.fire({
          icon: "info",
          title: "No se encontro cliente",
        });
        setInfoClient ([])
        setClient(e=>({...e, name_client:'', phone:'',email:''}));
      }
    } else {
      let infoClient = await ipcRenderer.invoke(
        "SEARCH_CLIENT_NAME",
        client.name_client
      );
      if (infoClient.length === 1) {
        let clientFound = await ipcRenderer.invoke(
          "GET_ONE_CLIENT",
          infoClient[0].id
        );
        setClient(clientFound);
        let BillsClient = await ipcRenderer.invoke(
          "GET_LAST_BILL_CLIENT",
          infoClient[0].id
        );
        setInfoClient(BillsClient);
      } else if (infoClient.length > 1) {
        Toast.fire({
          icon: "info",
          title: `Se encontraron ${infoClient.length} Clientes, revisalos en el panel`,
        });
        setManyClients(true);
        setClient(e=>({...e, phone:'',email:'', id:''}))
        setInfoClient(infoClient);
      }else if (!infoClient.length){
        Toast.fire({
          icon: "info",
          title: `No se encontraron clientes con ese nombre`,
        });
        setClient(e=>({...e, phone:'',email:'', id:''}));
        setInfoClient([]);
        setManyClients(false)
      }
    }
  };
  const onkeypress = (e) => {
    let id = e.target.id
    id = id.split('-')
    if (e.key === "Enter") {
      document.querySelector(`#${id[0]}`).click();
    }
  };

  return (
    <div className={S.contClient}>
      <div className={S.leftClient}>
        <label>Cliente:</label>
        <div style={{ display: "flex", flexDirection: "row", width:'100%' }}>
          <input
            id="searchClientName-input"
            className={S.inputName}
            onKeyPress={onkeypress}
            style={screenShot ? { height: "20px" } : {}}
            disabled={saveBill}
            type="text"
            value={client.name_client ? client.name_client : ""}
            onChange={onHandlerChange}
            name="name_client"
          />
          <img
            id="searchClientName"
            style={saveBill ? { display: "none" } : { cursor: "pointer" }}
            onClick={!saveBill ? onHandlerClick : () => {}}
            className={S.search}
            src={search}
            alt=""
          />
        </div>
        <label>Email:</label>
        <input
          style={screenShot ? { height: "20px" } : {}}
          disabled={saveBill}
          type="email"
          value={client.email ? client.email : ""}
          onChange={onHandlerChange}
          name="email"
        />
      </div>
      <div className={S.rightClient}>
        <label>Documento:</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            id="searchClient-input"
            onKeyPress={onkeypress}
            style={screenShot ? { height: "20px" } : {}}
            disabled={saveBill}
            type="number"
            value={client.id ? client.id : ""}
            onChange={onHandlerChange}
            name="id"
          />
          <img
            id="searchClient"
            style={saveBill ? { display: "none" } : { cursor: "pointer" }}
            onClick={!saveBill ? onHandlerClick : () => {}}
            className={S.search}
            src={search}
            alt=""
          />
        </div>
        <label>Telefono:</label>
        <input
          style={screenShot ? { height: "20px" } : {}}
          disabled={saveBill}
          type="number"
          value={client.phone ? client.phone : ""}
          onChange={onHandlerChange}
          name="phone"
        />
      </div>
    </div>
  );
}
