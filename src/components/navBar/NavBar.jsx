import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../features.js/Toast";
import S from "./navBar.module.css";
import { useLocation } from "react-router-dom";
const ipcRenderer = window.ipcRenderer;

export default function NavBar() {
  let navigate = useNavigate();
  const location = useLocation();
  const verify = async (e) => {
    console.log (location.pathname)
    if (location.pathname !== "/registroGeneral") {
      const { value: password } = await Swal.fire({
        title: "Ruta Protegida",
        input: "password",
        inputLabel: "Ingrese su Contraseña",
        inputPlaceholder: "Contraseña...",
        inputAttributes: {
          maxlength: 20,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      let verify = await ipcRenderer.invoke("VERIFY_PASS", password);
      if (verify) {
        return navigate("/registroGeneral")
        // document.querySelector("#NavLink").click();
      } else {
        Toast.fire({
          icon: "error",
          title: "Contraseña incorrecta",
          width:'290px'
        });
      }
    }
  };

  return (
    <div className={S.contNavbar} >
      <NavLink className={({ isActive }) =>isActive?S.act:S.NavLink} to="/">Facturación</NavLink>
      <NavLink className={({ isActive }) =>isActive?S.act:S.NavLink} to="/registro">Reporte Diario</NavLink>
      <div onClick={verify} className={S.buttonVerify}>
        <NavLink className={({ isActive }) =>isActive?S.actN:S.NavLinkVerify} to="/registroGeneral">
          Reporte General
        </NavLink>
      </div>
    </div>
  );
}
