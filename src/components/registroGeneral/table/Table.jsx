import React from "react";
import S from "./table.module.css";
import eye from "../../../assets/Img/eye.png";
export default function Table({ values, services, gainStylists, seeBill }) {
  const totalPrice = services.reduce((acc, e) => {
    acc = acc + e.price;
    return acc;
  }, 0);

  const totalEst = services.reduce((acc, e) => {
    if (e.percentage) {
      acc = acc + e.price * (e.percentage / 100);
    }
    return acc;
  }, 0);

  return (
    <table className={S.table}>
      <tbody>
        <tr>
          <th colSpan="9"> Balance General</th>
        </tr>
        <tr>
          <th>Efectivo</th>
          <th>Davivienda</th>
          <th>Bancolombia</th>
          <th>Tarjeta</th>
          <th>Pendientes</th>
          <th>Total</th>
          <th>Gastos</th>
          <th>Pago a Esteticistas</th>
          <th>Total Neto</th>
        </tr>
        <tr>
          <td>
            {"$" + new Intl.NumberFormat("de-DE").format(values.efectivo)}
          </td>
          <td>{"$" + new Intl.NumberFormat("de-DE").format(values.dav)}</td>
          <td>{"$" + new Intl.NumberFormat("de-DE").format(values.banc)}</td>
          <td>{"$" + new Intl.NumberFormat("de-DE").format(values.targe)}</td>
          <td>{"$" + new Intl.NumberFormat("de-DE").format(values.debt)}</td>
          <td>
            {"$" + new Intl.NumberFormat("de-DE").format(values.price_Total)}
          </td>
          <td>
            {"$" + new Intl.NumberFormat("de-DE").format(values.expensess)}
          </td>
          <td>
            {"$" + new Intl.NumberFormat("de-DE").format(values.stylist_total)}
          </td>
          <td>
            {"$" + new Intl.NumberFormat("de-DE").format(values.total_neto)}
          </td>
        </tr>
        <tr>
          <th colSpan="9"> </th>
        </tr>

        {gainStylists.length ? (
          <tr>
            <th>Esteticista</th>
            <th>Ganancia total</th>
            <th colSpan={7}></th>
          </tr>
        ) : null}
        {gainStylists.map((e, idx) => (
          <tr>
            <td>{e.name_stylist}</td>
            <td>{"$" + new Intl.NumberFormat("de-DE").format(e.gain)}</td>
            <td colSpan={7}></td>
          </tr>
        ))}

        <tr>
          <th colSpan="9"> </th>
        </tr>
        <tr>
          <th>Cliente</th>
          <th>Servicio</th>
          <th>Esteticista</th>
          <th>Precio</th>
          <th>Ganancia Esteticista</th>
          <th>Estado</th>
          <th>Ver</th>
        </tr>

        {services.map((e, idx) => (
          <tr key={idx}>
            <td>{e.name_client}</td>
            <td>{e.name_service ? e.name_service : e.name_product}</td>
            <td>{e.name_stylist ? e.name_stylist : "-----"}</td>
            <td>{"$" + new Intl.NumberFormat("de-DE").format(e.price)}</td>
            <td>
              {e.percentage
                ? "$" +
                  new Intl.NumberFormat("de-DE").format(
                    e.price * (e.percentage / 100)
                  )
                : "-----"}
            </td>
            <td>{e.status[0].toUpperCase() + e.status.substring(1)}</td>
            <td>
              <img
                style={{ width: "20px", cursor: "pointer" }}
                src={eye}
                alt=""
                onClick={() => seeBill(e.id_bill)}
              />
            </td>
          </tr>
        ))}
        <tr>
          <th colSpan={3} ></th>
          <th>{"$" + new Intl.NumberFormat("de-DE").format(totalPrice)}</th>
          <th>{"$" + new Intl.NumberFormat("de-DE").format(totalEst)}</th>
          <th colSpan={2} ></th>

        </tr>
      </tbody>
    </table>
  );
}
