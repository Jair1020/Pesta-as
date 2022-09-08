import React from 'react'
import S from './lastServices.module.css'

export default function Observations({obse,onHandlerObs}) {
  return (
    <div className={S.contObs} >
      <span>Observaciones Personales:</span>
      <textarea onChange={onHandlerObs} name='personal_obs' value={obse.personal_obs} ></textarea>
      <span>Observaciones Tecnicas:</span>
      <textarea  onChange={onHandlerObs} name='technical_obs' value={obse.technical_obs}></textarea>
    </div>
  )
}
