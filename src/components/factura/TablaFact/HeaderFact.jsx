import React from "react";
import logo from "../../../assets/Img/logo.png";
import S from "../factura.module.css";
import whatsapp from "../../../assets/Img/whatsapp.png";
import gmail from "../../../assets/Img/gmail.png";
import ubicacion from "../../../assets/Img/ubicacion.png";

export default function HeaderFact({ bill}) {
  return (
    <>
      <div className={S.contlogo}>
        <img className={S.logo} src={logo} alt="logo" />
        <div className={S.contRecibo}>
          <span className={S.recibo}>Factura No:</span>
          <span>{bill.id?bill.id:'---'}</span>
        </div>
      </div>
      <div className={S.header}>
        <div className={S.headerLeft}>
          <span className={S.inf}>
            <img className={S.logoinf} src={whatsapp} alt="" /> 3226876792
          </span>
          <span className={S.inf}>
            {" "}
            <img className={S.logoinf} src={gmail} alt="" />{" "}
            pestanassincelejo@gmail.com
          </span>
          <div>
            <span className={S.inf}>
              <img className={S.logoinf} src={ubicacion} alt="" /> Parque
              Comercial Guacari local 1106
            </span>
            <span style={{ paddingLeft: "20px", display: "block" }}>
              Sincelejo, Sucre
            </span>
          </div>
        </div>
        <div className={S.headerRight}>
          <div className={S.contNit}>
            <span className={S.nit}>NIT: </span>
            <span>23180780-1</span>
          </div>
          <div className={S.contFecha}>
            <span className={S.fecha}>Fecha:</span>
            <span>{bill.bill_date?new Date (bill.bill_date).toLocaleDateString():new Date(Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
