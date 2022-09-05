import React from 'react'
import S from './ModalPercentages.module.css'
import x from '../../../../assets/Img/x.svg'

export default function ModalPercentages(setModal) {


  return (
    <>
    <div className={S.contMainModal}>
      <div className={S.contModal}>
        <img
          onClick={() => setModal(false )}
          className={S.volver}
          src={x}
          alt=""
        />
        <div className={S.maincont}>

        </div>
      </div>
    </div>
    <div className={S.modalBack}></div>
  </>
  )
}
