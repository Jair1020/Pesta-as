import React from "react";
import DataClient from "../../factura/DataClient";
import Count from "../../factura/TablaFact/Count";
import HeaderFact from "../../factura/TablaFact/HeaderFact";
import HeaderTabla from "../../factura/TablaFact/HeaderTabla";
import Row from "../../factura/TablaFact/Row";
import S from "./modalBill.module.css";
import x from "../../../assets/Img/x.svg";

export default function ModalBill({ bill, services, client, setModal}) {
  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <img onClick={()=>setModal({state:false})} className={S.volver} src={x} alt="" />
          <div className={S.maincont}>
            <div>
              <HeaderFact bill={bill} />
              <DataClient
                client={client}
                setClient={() => {}}
                saveBill={true}
                screenShot={false}
              />
              <HeaderTabla />
              <Row
                bill={bill}
                screenShot={false}
                saveBill={true}
                services={services}
                setServices={() => {}}
                modal={true}
              />
              <Count
                saveBill={true}
                bill={bill}
                setBill={() => {}}
                services={services}
                screenShot={false}
                modal={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  );
}
