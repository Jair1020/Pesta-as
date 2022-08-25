import React from "react";
import S from "./factura.module.css";

export default function DataClient() {
  return (
    <div className={S.contClient}>
      <div className={S.leftClient} >
        <label>Cliente:</label>
        <input type="text" />
        <label>Email:</label>
        <input type="mail" />
      </div>
      <div className={S.rightClient} >
        <label>Documento:</label>
        <input type="number" />
        <label>Telefono:</label>
        <input type="number" />
      </div>
    </div>
  );
}
