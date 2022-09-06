import React from 'react'
import { useNavigate } from 'react-router-dom';
import settings from '../../assets/Img/settings.png'
import S from './registroGeneral.module.css'

export default function RegistroGeneral() {
  let navigate = useNavigate();




  return (
    <div>
      <img className={S.iconSettings} onClick={()=>navigate('/settings')} src={settings} alt=""/>
     
    </div>
  )
}
