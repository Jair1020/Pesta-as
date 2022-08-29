import React from 'react'
import iconoCrear from '../../../assets/Img/iconoCrearFactura.svg'
import S from './buttons.module.css'

export default function ButtonCreate({createBill}) {
  return (
    <button onClick={createBill} className={S.ButtonCreate}>
      <img src={iconoCrear} alt="" />
      Crear Factura
    </button>
  )
}
