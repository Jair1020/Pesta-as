import React, { useEffect } from "react";
import S from "../factura.module.css";
import bancolombia from "../../../assets/Img/bancolombia.png";
import davivienda from "../../../assets/Img/davivienda.jpg";

export default function Count({ bill, setBill, services, saveBill }) {
  useEffect(() => {
    let t = services.reduce((acc, e) => {
      acc = acc + (e.price_Total ? e.price_Total : 0);
      return acc;
    }, 0);
    setBill((b) => ({ ...b, total_price: t }));
    let debt =
      t -
      (bill.catch ? bill.catch : 0) -
      (bill.transferDav ? bill.transferDav : 0) -
      (bill.transferBanc ? bill.transferBanc : 0) -
      (bill.card ? bill.card : 0);
    setBill((b) => ({ ...b, debt: debt }));
  }, [services]);

  const onHandlerChange = (e) => {
    let number = parseInt(e.target.value.replace(/[.]/g, ""));
    if (number < 0 || isNaN(number)) {
      number = 0;
    }else if (number>100000000){
      number=0
    }
    setBill((b) => ({ ...b, [e.target.name]: number }));

    setBill((b) => ({
      ...b,
      debt:
        b.total_price -
        (b.catch ? b.catch : 0) -
        (b.transferDav ? b.transferDav : 0) -
        (b.transferBanc ? b.transferBanc : 0) -
        (b.card ? b.card : 0),
    }));
  };

  const onHandlerObs = (e) => {
    let obs= e.target.value
    if (obs.length>1000){
      obs= obs.slice (0,1000)
    }
    setBill((b) => ({ ...b, observations: obs }));
  };

  return (
    <div className={S.ContTotals}>
      <div className={S.ContTotalsLeft}>
        <span className={S.obs}>Observaciones:</span>
        <textarea
          disabled={!saveBill}
          onChange={onHandlerObs}
          className={S.obsImp}
          value={bill.observations ? bill.observations : ""}
          type="text"
        />
        <span className={S.frase}>
          {" "}
          !Gracias por tu compra, vuelve Pronto!{" "}
        </span>
      </div>
      <div className={S.ContTotalsRight}>
        <div className={S.countLeft}>
          <span>Total: $</span>
          <span>Efectivo: $</span>
          <span>
            <img className={S.bancolombia} src={bancolombia} alt="" />{" "}
            Tranferencia: $
          </span>
          <span>
            <img className={S.davivienda} src={davivienda} alt="" />{" "}
            Tranferencia: $
          </span>
          <span>Tarjeta: $</span>
          <span>Saldo: $</span>
        </div>
        <div className={S.countRight}>
          <span>
            {new Intl.NumberFormat("de-DE").format(
              bill.total_price ? bill.total_price : 0
            )}
          </span>
          <input
            disabled={!saveBill}
            name="catch"
            value={
              bill.catch ? new Intl.NumberFormat("de-DE").format(bill.catch) : 0
            }
            onChange={onHandlerChange}
          />
          <input
            disabled={!saveBill}
            name="transferBanc"
            value={
              bill.transferBanc
                ? new Intl.NumberFormat("de-DE").format(bill.transferBanc)
                : 0
            }
            onChange={onHandlerChange}
          />
          <input
            disabled={!saveBill}
            name="transferDav"
            value={
              bill.transferDav
                ? new Intl.NumberFormat("de-DE").format(bill.transferDav)
                : 0
            }
            onChange={onHandlerChange}
          />
          <input
            disabled={!saveBill}
            name="card"
            value={
              bill.card ? new Intl.NumberFormat("de-DE").format(bill.card) : 0
            }
            onChange={onHandlerChange}
          />
          <span>
            {bill.debt ? new Intl.NumberFormat("de-DE").format(bill.debt) : 0}
          </span>
        </div>
      </div>
    </div>
  );
}
