import React from 'react'
import DailyBalance from '../DailyBalance'
import S from './reportModal.module.css'
import x from '../../../../assets/Img/x.svg'

export default function ReportModal({setModalReport}) {
  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <img
            onClick={() => setModalReport(false )}
            className={S.volver}
            src={x}
            alt=""
          />
          <div className={S.maincont}>
            <DailyBalance/>
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  )
}
