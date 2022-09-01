import React from "react";
import x from '../../../assets/Img/x.svg'
import S from './buttons.module.css'

export default function ButtonDeleteBill({deleteBill}) {
  return <button className={S.deleteBill} onClick={deleteBill} ><img src={x} alt="" /> </button>;
}