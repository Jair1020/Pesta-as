
import React, { useState } from "react";
import S from "./dropDownSetting.module.css";

export default function DropDownSetting({onHandlerOption, options, category }) {
  const [show, setShow] = useState(false);
  const [option, setOption]= useState (category?category:'')

  const onHandlerButton = () => {
    setShow(!show);
  };
  const onHandlerOptions = (e) => {
    setOption (e.target.outerText)
    onHandlerOption (e.target.id)
  }

  return (
    <div className={S.contDrop}>
      <div>
        <button
          style={category?{flexDirection:'row'}:{}}
          onClick={onHandlerButton}
          type="button"
          className={S.DropdownButton}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span style={category?{fontWeight:'normal'}:{}} >{option}</span>
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
        style={category?{top:'22px'}:{}}
          className={S.contOptions}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onMouseLeave={(e) => setShow(!show)}
        >
          <div style={category?{width:'170px'}:{}} >
            {options.map((e, idx) => (
              !category?<p
                onClick={onHandlerOptions}
                key={idx}
                id={idx}
              >
                {e}
              </p>:<p
              style={{fontWeight:'normal', textAlign:'start', width:'90%'}}
                onClick={onHandlerOptions}
                key={e.id}
                id={e.id}
              >
                {e.name_category[0].toUpperCase() + e.name_category.substring(1)}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
