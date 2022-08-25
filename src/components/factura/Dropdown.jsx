import React from "react";
import S from "./factura.module.css";
export default function Dropdown({ options }) {
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
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
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
          tabindex="-1"
          onMouseLeave={(e) => setShow(!show)}
        >
          <div>
            {options.map((e) => (
              <p>{e}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
