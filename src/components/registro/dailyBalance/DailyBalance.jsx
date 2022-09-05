import React from "react";
import S from "./dailyBalance.module.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function DailyBalance() {
  return (
    <>
      <ReactHTMLTableToExcel
        id="DescargarReporte"
        className=""
        table="tableReport"
        filename="Reporte-01/05/2022"
        sheet="Reporte"
        buttonText="Exportar a Excel"
      />

      <table id="tableReport" className={S.table}>
        <tbody>
          <tr>
            <th>Cliente</th>
            <th>Precio</th>
            <th>Efectivo</th>
            <th>Bancolombia</th>
            <th>Davivienda</th>
            <th>tarjeta</th>
            <th>Esteticista</th>
            <th>Ganancia Esteticista</th>
          </tr>
          <tr>
            <td>Maria Fernanda Camelo</td>
            <td>$30.000</td>
            <td>$30.000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>Eclis Fernanda Romeo Guzman</td>
            <td>50000</td>
          </tr>
          <tr>
            <td colSpan="8"></td>
          </tr>
          <tr>
            <th>Total</th>
            <td>$779.000</td>
            <td>$492.000</td>
            <td>$287.000</td>
            <td>$287.000</td>
            <td>$287.000</td>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td colSpan={8}></td>
          </tr>
          <tr>
            <th>Esteticistas</th>
            <td colSpan={7}></td>
          </tr>
          <tr>
            <th>Ganacias Totales</th>
            <td colSpan={7}></td>
          </tr>
          <tr>
            <td colSpan="8"></td>
          </tr>
          <tr>
            <th></th>
            <th>Gastos</th>
            <th>Pendientes</th>
            <th>Pago a estilistas</th>
            <th>Total neto</th>
          </tr>
          <tr>
            <td></td>
            <td>$492.000</td>
            <td>$287.000</td>
            <td>$287.000</td>
            <td>$287.000</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
