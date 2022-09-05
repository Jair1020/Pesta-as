import React, { useState } from "react";
import S from "./lastServices.module.css";
import arrowRight from '../../../assets/Img/arrowRight.png'
import arrowLeft from '../../../assets/Img/arrowLeft.png'

export default function ({infoClient}) {
  const [checked, setChecked] = useState (false)
  const onHandlerClick=(e)=>{
    setChecked (e.target.checked)
  }


  return (
    <>
      <input onClick={onHandlerClick} type="checkbox" id="btn-menu" className={S.btnMenu} />        
          <label className={S.label}  htmlFor="btn-menu"><img src={checked?arrowLeft:arrowRight} alt="" /></label>
      <div className={S.container}>
        <div className={S.cont}>
          <div className={S.button}>
          </div>
          <nav>
            <span className={S.name} >{infoClient.length?infoClient[0].name_client:'El cliente no tiene servicios'}</span>
           {infoClient.map(e=>(
              <div>
              <span>{e.date}</span>
              <span>{e.name_service}</span>
              <span>{e.name_stylist}</span>
              <span>${new Intl.NumberFormat("de-DE").format(e.price)}</span>
            </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
//  {
// [1]     name_client: 'Jair Avila',
// [1]     id_bill: 10000,
// [1]     date: '2022-09-04',
// [1]     price: 800000,
// [1]     name_service: 'Perfilación Cejas con cera',
// [1]     name_stylist: 'Jhoana Lopez Tovar'
// [1]   },
