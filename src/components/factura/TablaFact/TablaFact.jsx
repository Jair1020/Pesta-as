import React from "react";
import S from "../factura.module.css";
import Count from "./Count";
import Row from "./Row";

const arr = [0,1,2,3,4]

export default function TablaFact() {
  return (
    <div>
      <div className={S.headerTabla}>
        <span className={S.DescColumn}>Descripción</span>
        <span className={S.cantColumn} >Cant</span>
        <span className={S.EstColumn} >Esteticista</span>
        <span className={S.Punid} >$ P/und  </span>
        <span>$ Descuento</span>
        <span className={S.totalRow} >$ Total</span>
      </div>
      {
        arr.map ((e,idx)=> (
          <Row idx={idx}/>
        ))
      }
      <Count/>
    </div>
  );
}
