import React from "react";
import DailyBalance from "../DailyBalance";
import S from "./reportModal.module.css";
import x from "../../../../assets/Img/x.svg";

export default function ReportModal({
  setModalReport,
  dailyServices,
  expenses,
  changes
}) {
  let valUnitarios = {};
  let obj = {};
  valUnitarios.efectivo = dailyServices.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = acc + (e.catch ? e.catch : 0);
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};
  valUnitarios.dav = dailyServices.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.transferDav ? e.transferDav : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};

  valUnitarios.banc = dailyServices.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.transferBanc ? e.transferBanc : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};

  valUnitarios.targe = dailyServices.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
    acc = (e.card ? e.card : 0) + acc;
    obj[e.id_bill] = true;
    }
    return acc;
  }, 0);

  valUnitarios.price_Total = dailyServices.reduce((acc, e) => {
    acc = (e.price ? e.price : 0) + acc;
    return acc;
  }, 0);

  obj = {};
  valUnitarios.debt = dailyServices.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
    acc = (e.debt ? e.debt : 0) + acc;
    obj[e.id_bill] = true;
    }
    return acc;
  }, 0);

  valUnitarios.expensess = expenses.reduce((acc, e) => {
    acc = acc + (e.expense_price ? parseInt(e.expense_price) : 0);
    return acc;
  }, 0);

  let stylist_gain = [];

  dailyServices.forEach((e) => {
    if (e.name_stylist) {
      let idx = stylist_gain.findIndex(
        (s) => s.name_stylist === e.name_stylist
      );

      if (idx >= 0) {
        stylist_gain[idx].gain =
          stylist_gain[idx].gain + e.price * (e.percentage / 100);
      } else {
        let obj = {
          name_stylist: e.name_stylist,
          gain: e.price * (e.percentage / 100),
        };
        stylist_gain.push({ ...obj });
      }
    }
  });

  valUnitarios.stylist_total = stylist_gain.reduce((acc, e) => {
    acc = e.gain + acc;
    return acc;
  }, 0);
  valUnitarios.total_neto =
    valUnitarios.price_Total -
    valUnitarios.debt -
    valUnitarios.expensess -
    valUnitarios.stylist_total;

  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <img
            onClick={() => setModalReport(false)}
            className={S.volver}
            src={x}
            alt=""
          />
          <div className={S.maincont}>
            <DailyBalance
              valUnitarios={valUnitarios}
              stylist_gain={stylist_gain}
              dailyServices={dailyServices}
              changes={changes}
            />
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  );
}
