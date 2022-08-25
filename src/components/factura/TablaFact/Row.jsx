import React from 'react'
import S from "../factura.module.css"
import Dropdown from "../Dropdown";
import {estilistas , servicios} from "../../../mockups/serviciosEmpleadas"


export default function Row({idx}) {
  return (
    <div style={idx%2===0?{backgroundColor:'#fbdada'}:{}} className={S.rows} >
    <div className={S.contDesc}>
      <Dropdown options={servicios} />
      <span></span>
    </div>
    <input className={S.cantColumn} type="number" />
    <div className={S.contEst}>
      <Dropdown options={estilistas} />
      <span></span>
    </div>
    <input className={S.Punid} type="number" />
    <input className={S.descuento} type="number" />
    <span className={S.totalRow}>Total</span>
  </div>
  )
}
