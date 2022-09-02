import React from "react";
import HeaderRegistro from "./headerRegistro/HeaderRegistro";
import S from "./registro.module.css";
import RowRegistro from "./rowRegistro/RowRegistro";

export default function Registro() {
  return (
    <div className={S.contRegistro}>
      <HeaderRegistro />
      <RowRegistro />
    </div>
  );
}
