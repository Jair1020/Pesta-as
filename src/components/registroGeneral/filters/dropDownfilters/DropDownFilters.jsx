import React, { useState } from "react";
import S from "./dropDownFilters.module.css";

export default function DropDownFilters({
  onHandlerOption,
  options,
  stylists,
  filters
}) {
  const [show, setShow] = useState(false);

  const onHandlerButton = () => {
    setShow(!show);
  };
  const onHandlerOptions = (e) => {
    onHandlerOption({id:e.target.id, name:e.target.outerText});
  };

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
          <span>
            {stylists ? "Escoge las esteticistas" : "Escoge los servicios"}
          </span>
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
            {options.map((e, idx) => (
              <>
                {e.name_service ? (
                  <>
                    {!stylists && !idx ? (
                      <p
                        style={{
                          backgroundColor: "#f9c8c8",
                          cursor: "default",
                        }}
                      >
                        Servicios
                      </p>
                    ) : null}
                    <p
                      style={filters[!stylists?e.name_service:e.stylist]?{
                        backgroundColor: 'rgb(212, 191, 204)',
                        fontWeight: "normal",
                        textAlign: "start",
                        width: "90%",
                      }:{
                        fontWeight: "normal",
                        textAlign: "start",
                        width: "90%",
                      }}
                      onClick={onHandlerOptions}
                      key={e.id}
                      id={e.id}
                    >
                      {stylists ? e.name_stylist : e.name_service}
                    </p>
                  </>
                ) : (
                  <>
                    {!stylists && options[idx - 1].name_service ? (
                      <p
                        style={{
                          backgroundColor: "#f9c8c8",
                          cursor: "default",
                        }}
                      >
                        Productos
                      </p>
                    ) : null}
                    <p
                    style={filters[!stylists?e.name_product:e.name_stylist]?{
                      backgroundColor: 'rgb(212, 191, 204)',
                      fontWeight: "normal",
                      textAlign: "start",
                      width: "90%",
                    }:{
                      fontWeight: "normal",
                      textAlign: "start",
                      width: "90%",
                    }}
                      onClick={onHandlerOptions}
                      key={e.id}
                      id={e.id}
                    >
                      {stylists ? e.name_stylist : e.name_product}
                    </p>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
