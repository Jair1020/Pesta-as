import React from 'react'
import { useNavigate } from 'react-router-dom';
import settings from '../../assets/Img/settings.png'

export default function RegistroGeneral() {
  let navigate = useNavigate();

  return (
    <div>
      <img onClick={()=>navigate('/settings')} src={settings} alt=""/>
    </div>
  )
}
