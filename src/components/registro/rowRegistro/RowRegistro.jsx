import React from "react";
import S from "./rowRegistro.module.css";
import eye from "../../../assets/Img/eye.png";

export default function RowRegistro({ dailyServices, seeBill }) {
  return dailyServices?.map((e, idx) => (
    <div
      style={
        idx % 2 === 0
          ? { backgroundColor: "#fbdada" }
          : { backgroundColor: "#f9c8c8" }
      }
      className={S.contRowReg}
    >
      <span className={S.columnClie}>{e.name_client}</span>
      <span className={S.columnServ}>{e.name_service || e.name_product}</span>
      <span className={S.columnEstil}>{e.name_stylist || "-------"}</span>
      <span className={S.columnEstado}>
        {e.status[0].toUpperCase() + e.status.substring(1)}
      </span>
      <span className={S.columnPrecio}>{"$ " + new Intl.NumberFormat("de-DE").format(e.price)}</span>
      <div className={S.columnVer}>
        <img
          src={eye}
          alt=""
          onClick={() => seeBill(e.id_bill)}
        />
      </div>
    </div>
  ));
}
