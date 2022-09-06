import React, { useState } from "react";
import DropDownSetting from "../dropDownSetting/DropDownSetting";
import S from "./modalAdd.module.css";
import percentageimg from '../../../assets/Img/percentage.png'
import ModalPercentages from "../cards/modalPercentages/ModalPercentages";
export default function ModalAdd({ idxseccion, categories, setModal, create }) {
  const [input, setInput] = useState({});
  const [percentages, setPercentages] = useState ([...categories].map (e=>{
    return {name_category:e.name_category, categoryId:e.id }
  }))
  const [changeModal, setChangeModal] = useState (false)
  const keys =
    idxseccion === 0
      ? {
          firts: "name_stylist",
          second: "email",
          third: "phone",
        }
      : idxseccion === 1
      ? {
          firts: "name_service",
          second: "price",
          third: "name_category",
        }
      : {
          firts: "name_product",
          second: "price",
          third: "name_category",
        };

  const onHandlerCategory = (id) => {
    setInput((i) => ({ ...i, id_category: id }));
  };
  const onHandlerInput = (e) => {
    if (e.target.value.length > 45) return;
    if (e.target.name === "price") {
      let num = parseInt(e.target.value.replace(/[.]/g, ""));
      if (typeof num !== "number" || num < 0 || num > 100000000) return;
      setInput((i) => ({ ...i, price: num }));
    } else {
      setInput((i) => ({ ...i, [e.target.name]:e.target.value }));
    }
  };

  return !changeModal?(
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <div className={S.maincont}>
          {!idxseccion?<img /* id={e.id} name={e[keys.name]} */ src={percentageimg} onClick={()=>setChangeModal(true)} alt="" />:null}
            <div>
              <label>Nombre:</label>
              <input
                onChange={onHandlerInput}
                name={keys.firts}
                type="text"
                value={input[keys.firts]}
              />
            </div>
            {!idxseccion ? (
              <div>
                <label>Documento:</label>
                <input
                  onChange={onHandlerInput}
                  name="id"
                  type="text"
                  value={input.id}
                />
              </div>
            ) : null}
            <div>
              <label>{idxseccion ? "Precio:" : "Email:"}</label>
              <input
                onChange={onHandlerInput}
                name={keys.second}
                type="text"
                value={
                  idxseccion
                    ?input.price?new Intl.NumberFormat("de-DE").format(input.price):''
                    : input.email
                }
              />
            </div>
            <div
              style={
                idxseccion
                  ? {
                      flexDirection: "row",
                      gap: "10px",
                      marginBottom: "10px",
                      justifyContent: "start",
                      marginLeft: "20px",
                    }
                  : {}
              }
            >
              <label>{idxseccion ? "Categoria:" : "Telefono:"}</label>
              {idxseccion ? (
                <DropDownSetting
                  options={categories}
                  onHandlerOption={onHandlerCategory}
                  category=" "
                />
              ) : (
                <input
                  onChange={onHandlerInput}
                  name="phone"
                  type="text"
                  value={input.phone}
                />
              )}
            </div>
            <div className={S.buttons}>
              <button onClick={() => create({input, percentages})}>Guardar</button>
              <button onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  ):<ModalPercentages setModal={setChangeModal} percentages={percentages} setPercentages={setPercentages}/>;
}
