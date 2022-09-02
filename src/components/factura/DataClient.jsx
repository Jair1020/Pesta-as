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
}) {
  const onHandlerChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  const onHandlerClick = async () => {
    let clientFound = await ipcRenderer.invoke("GET_ONE_CLIENT", client.id);
    console.log(clientFound);
    clientFound
      ? setClient(clientFound)
      : Toast.fire({
          icon: "info",
          title: "No se encontro cliente",
        });
  };
  const onkeypress = (e) => {
    if (e.key==='Enter'){
      document.querySelector("#searchClient").click();
    }
  }

  return (
    <div className={S.contClient}>
      <div className={S.leftClient}>
        <label>Cliente:</label>
        <input
          style={screenShot ? { height: "20px" } : {}}
          disabled={saveBill}
          type="text"
          value={client.name_client ? client.name_client : ""}
          onChange={onHandlerChange}
          name="name_client"
        />
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
