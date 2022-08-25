import React from 'react'
import logo from "../../../assets/Img/logo.png";
import S from "../factura.module.css";

export default function HeaderFact({bill , setBill}) {
  


  return (
    <>
    <div className={S.contlogo}>
          <img className={S.logo} src={logo} alt="logo" />
          <div className={S.contRecibo}>
            <span className={S.recibo}>Factura No:</span>
            <span>1</span>
          </div>
        </div>
        <div className={S.header}>
          <div className={S.headerLeft}>
            <span>3226876792</span>
            <span>pestanassincelejo@gmail.com</span>
            <span>Parque Comercial Guacari local 1106</span>
            <span>Sincelejo, Sucre</span>
          </div>
          <div className={S.headerRight}>
            <div className={S.contNit}>
              <span className={S.nit}>NIT: </span>
              <span>23180780-1</span>
            </div>
            <div className={S.contFecha} >
              <span className={S.fecha} >Fecha:</span>
              <span>{new Date(Date.now()).toLocaleString()}</span>
            </div>
          </div>
        </div>
    </>
  )
}
