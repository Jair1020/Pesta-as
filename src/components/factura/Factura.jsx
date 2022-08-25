import React, { useState } from "react";
import DataClient from "./DataClient";
import S from "./factura.module.css";
import HeaderFact from "./TablaFact/HeaderFact";
import TablaFact from "./TablaFact/TablaFact";

export default function Factura() {
  const [bill, setBill] = useState ({})

  return (
    <div className={S.maincont}>
      <div className={S.cont}>
        <HeaderFact bill={bill} setBill={setBill} />
        <DataClient/>
        <TablaFact/>
      </div>
    </div>
  );
}
