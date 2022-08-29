import React from "react";
import S from "../factura.module.css";

export default function HeaderTabla() {
  return (
      <div className={S.headerTabla}>
        <span className={S.DescColumn}>Descripción</span>
        <span className={S.cantColumn} >Cant</span>
        <span className={S.EstColumn} >Esteticista</span>
        <span className={S.Punid} >P/und</span>
        <span>$ Descuento</span>
        <span className={S.totalRow} >Total</span>
      </div>
  );
}
