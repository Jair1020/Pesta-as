import React from "react";
import S from "./dailyBalance.module.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function DailyBalance({
  valUnitarios,
  dailyServices,
  stylist_gain,
  changes,
}) {
  return (
    <>
      <ReactHTMLTableToExcel
        id="DescargarReporte"
        className={S.exportExcel}
        table="tableReport"
        filename="Reporte-01/05/2022"
        sheet="Reporte"
        buttonText="Exportar a Excel"
      />

      <table id="tableReport" className={S.table}>
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Esteticista</th>
            <th>Ganancia Esteticista</th>
          </tr>

          {dailyServices.map((e, idx) => (
            <tr key={idx}>
              <td>{e.name_client}</td>
              <td>{e.name_service ? e.name_service : e.name_product}</td>
              <td>{"$" + new Intl.NumberFormat("de-DE").format(e.price)}</td>
              <td>
                {e.name_stylist
                  ? e.name_stylist.split(" ").slice(0, 3).join(" ")
                  : "------"}
              </td>
              <td>
                {"$" +
                  new Intl.NumberFormat("de-DE").format(
                    e.price * ((e.percentage ? e.percentage : 0) / 100)
                  )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <th>Efectivo</th>
            <th>Bancolombia</th>
            <th>Davivienda</th>
            <th>Tarjeta</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>
              {"$" +
                new Intl.NumberFormat("de-DE").format(valUnitarios.efectivo)}
            </td>
            <td>
              {"$" + new Intl.NumberFormat("de-DE").format(valUnitarios.banc)}
            </td>
            <td>
              {"$" + new Intl.NumberFormat("de-DE").format(valUnitarios.dav)}
            </td>
            <td>
              {"$" + new Intl.NumberFormat("de-DE").format(valUnitarios.targe)}
            </td>
            <td>
              {"$" +
                new Intl.NumberFormat("de-DE").format(valUnitarios.price_Total)}
            </td>
          </tr>
          <tr>
            <td colSpan="5"></td>
          </tr>

          <tr>
            <th></th>
            <th>Gastos</th>
            <th>Pendientes</th>
            <th>Pago a esteticistas</th>
            <th>Total neto</th>
          </tr>
          <tr>
            <td></td>
            <td>
              {"$" +
                new Intl.NumberFormat("de-DE").format(valUnitarios.expensess)}
            </td>
            <td>
              {"$" + new Intl.NumberFormat("de-DE").format(valUnitarios.debt)}
            </td>
            <td>
              {"$" +
                new Intl.NumberFormat("de-DE").format(
                  valUnitarios.stylist_total
                )}
            </td>
            <td>
              {"$" +
                new Intl.NumberFormat("de-DE").format(valUnitarios.total_neto)}
            </td>
          </tr>
          <tr>
            <td colSpan="8"></td>
          </tr>
          {changes.length?<tr>
            <th colSpan="3"> Cambios a facturas</th>
          </tr>:null}
         {changes.length? <tr>
            <th>id factura</th>
            <th>Nombre</th>
            <th>Razón</th>
          </tr>:null}
          {changes.map((e) => (
            <tr>
              <td>{e.billId}</td>
              <td>{e.name_change}</td>
              <td>{e.reasonChange}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <th>Esteticistas</th>
            <th>Ganacias Totales</th>
          </tr>
          {stylist_gain.map((e, idx) => (
            <tr key={idx}>
              <th>{e.name_stylist.split(" ").slice(0, 3).join(" ")}</th>
              <td>{"$" + new Intl.NumberFormat("de-DE").format(e.gain)}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </>
  );
}
