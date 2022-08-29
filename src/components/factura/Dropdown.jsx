import React from "react";
import S from "./factura.module.css";
export default function Dropdown({idx, options,onHandlerOption, services }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className={S.contDrop}>
      <div>
        <button
          onClick={() => setShow(!show)}
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
             {services?<p style={{fontWeight:'bold', cursor:'default', fontSize:'medium' , backgroundColor:'#f7b6b6' }} >Servicios</p>:null}
            {options.map((e) => (
            e.service?<p onClick={onHandlerOption} key={e.id} id={e.id} num_orden={idx} servicio={'true'} >{e.name}</p>:null
            ))}
            {services?<p style={{fontWeight:'bold', cursor:'default', fontSize:'larger' , backgroundColor:'#f7b6b6'}}>Productos</p>:null}
            {options.map((e) => (
            !e.service?<p onClick={onHandlerOption} key={e.id} id={e.id} num_orden={idx} servicio={'false'} >{e.name}</p>:null
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
