import React from 'react'
import S from './buttons.module.css'
import approved from '../../../assets/Img/approved.svg'
export default function ButtonBilling({facturar}) {
  return (
    <button onClick={facturar} className={S.ButtonCreate}>
      <img src={approved} alt="" />
      Facturar
    </button>
  )
}
