import React from "react";
import { Toast } from "../features.js/Toast";
import S from "./factura.module.css";
export default function Dropdown({idx, options,onHandlerOption, services, billProcess, justServices ,traerBillsProcess }) {
  const [show, setShow] = React.useState(false);
  const onHandlerButton = ()=>{
    if (billProcess){
      traerBillsProcess ()
    }
    if (billProcess && !options.length){
      return Toast.fire({
        icon: "warning",
        title: "No hay facturas en proceso",
      });
    }else {
      setShow(!show)
    }
  }
  return (
    <div className={S.contDrop}>
      <div>
        <button
          onClick={onHandlerButton}
          type="button"
          className={S.DropdownButton}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {show && (
        <div
          className={S.contOptions}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onMouseLeave={(e) => setShow(!show)}
        >
          <div>
             {services && (justServices==='services' || justServices==='both')  ?<p style={{fontWeight:'bold', cursor:'default', fontSize:'medium' , backgroundColor:'#f7b6b6' }} >Servicios</p>:null}
            {options.map((e) => (
            e.service?<p onClick={onHandlerOption} key={e.id} id={e.id} num_orden={idx} servicio={'true'} >{e.name}</p>:null
            ))}
            {services&&(justServices==='products'|| justServices==='both')?<p style={{fontWeight:'bold', cursor:'default', fontSize:'larger' , backgroundColor:'#f7b6b6'}}>Productos</p>:null}
            {options.map((e) => (
            !e.service?<p onClick={onHandlerOption} key={e.id?e.id:0} id={e.id} num_orden={idx} servicio={'false'} >{e.name?e.name:'Nueva factura'}</p>:null
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
