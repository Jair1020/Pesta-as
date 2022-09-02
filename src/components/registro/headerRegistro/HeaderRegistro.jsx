import React from "react";
import S from './headerRegistro.module.css'

export default function HeaderRegistro() {
  return (
    <div className={S.contHeaderReg} >
      <span className={S.columnServ} >Servicio</span>
      <span className={S.columnClie} >Cliente</span>
      <span className={S.columnEstil} >Estilista</span>
      <span className={S.columnEstado} >Estado</span>
      <span className={S.columnPrecio} >Precio</span>
      <span className={S.columnVer} >Ver</span>
    </div>
  );
}
