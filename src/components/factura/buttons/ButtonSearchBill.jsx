import React, { useState } from 'react'
import s from './buttons.module.css'


export default function ButtonSearchBill({handlerSearchBill}) {
  const [id, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    let num= parseInt (e.target.value)
    if (num && num>0 && e.target.value.length<20 ){
      setName(e.target.value);
    }else setName('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlerSearchBill (id)
  }
  const onkeypress = (e) => {
    if (e.key==='Enter'){
      document.querySelector("#buttonSearch").click();
    }
  } 

  return (
    <div className={s.searchBar}>

      <input
        onKeyPress ={onkeypress}
        className={s.input}
        value={id}
        placeholder="Ingresar doc del cliente "
        onChange={(e) => handleInputChange(e)}
      />
      <button
      id='buttonSearch'
        className={s.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      ></button>
    </div>
  );
}
