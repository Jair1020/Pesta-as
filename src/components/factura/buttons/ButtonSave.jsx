import React from 'react'
import S from './buttons.module.css'
import save from '../../../assets/Img/save.svg'
export default function ButtonSave({billSave}) {
  return (
    <button onClick={billSave} className={S.ButtonCreate}>
      <img src={save} alt="" />
      Guardar Factura
    </button>
  )
}
