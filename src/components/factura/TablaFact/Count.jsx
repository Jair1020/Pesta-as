import React from "react";
import S from "../factura.module.css";
import bancolombia from "../../../assets/Img/bancolombia.png"
import davivienda from "../../../assets/Img/davivienda.jpg"

export default function Count() {
  return (
    <div className={S.ContTotals}>
      <div className={S.ContTotalsLeft}>
        <span className={S.obs}  >Observaciones:</span>
        <textarea className={S.obsImp} type='text'/> 
        <span className={S.frase} > !Gracias por tu compra, vuelve Pronto! </span>
      </div>
      <div className={S.ContTotalsRight}>
        <div className={S.countLeft}>
          <span>Total:</span>
          <span>Efectivo: $</span>
          <span><img className={S.bancolombia} src={bancolombia} alt="" />  Tranferencia: $</span>
          <span><img className={S.davivienda} src={davivienda} alt="" />  Tranferencia: $</span>
          <span>Tarjeta: $</span>
          <span>Saldo:</span>
        </div>
        <div className={S.countRight}>
          <span> $1000000 </span>
          <input type="number" min={0}  />
          <input type="number" min={0} />
          <input type="number" min={0} />
          <input type="number" min={0} />
          <span>$100000</span>
        </div>
      </div>
    </div>
  );
}
