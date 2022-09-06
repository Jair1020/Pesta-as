import React, { useState } from "react";
import Cards from "./cards/Cards";
import S from "./settings.module.css";
import DropDownSetting from "./dropDownSetting/DropDownSetting";
import add from "../../assets/Img/add.png";
import { Toast } from "../features.js/Toast";
import ModalAdd from "./modalAdd/ModalAdd";
import { valAdd } from "./valAdd";
const ipcRenderer = window.ipcRenderer;
const secciones = ["Esteticistas", "Servicios", "Productos"];

export default function Settings() {
  const [idxseccion, setIdxseccion] = useState("");
  const [seccion, setSeccion] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

  const onHandlerSeccion = async (e) => {
    let idx = parseInt(e);
    if (idx === 0) {
      let stylists = await ipcRenderer.invoke("GET_STYLISTS");
      setIdxseccion(0);
      setSeccion(
        stylists.sort((a, b) => a.name_stylist.localeCompare(b.name_stylist))
      );
    } else if (idx === 1) {
      let services = await ipcRenderer.invoke("GET_SERVICES");
      setIdxseccion(1);
      setSeccion(
        services.sort((a, b) => a.name_service.localeCompare(b.name_service))
      );
    } else if (idx === 2) {
      let products = await ipcRenderer.invoke("GET_PRODUCTS");
      setIdxseccion(2);
      setSeccion(
        products.sort((a, b) => a.name_product.localeCompare(b.name_product))
      );
    }
    let categor = await ipcRenderer.invoke("GET_CATEGORIES");
    setCategories(
      categor.sort((a, b) => a.name_category.localeCompare(b.name_category))
    );
  };
  const create = async ({input, percentages}) => {
    let err = valAdd({ input: input, idxseccion: idxseccion });
    if (Object.keys(err).length) {
      Toast.fire({
        icon: "error",
        title: Object.values(err)[0],
      });
    } else {
      let created;
      if (idxseccion === 0) {
        let per = [...percentages].map (e=>{
          return {...e, stylistId:input.id}
        })
        created = await ipcRenderer.invoke("ADD_STYLIST", {stylist:input, percentages:per });
      } else if (idxseccion === 1) {
        created = await ipcRenderer.invoke("ADD_SERVICE", input);
      } else {
        created = await ipcRenderer.invoke("ADD_PRODUCT", input);
      }
      if (created === true) {
        Toast.fire({
          icon: "success",
          title: "Creado",
          width: "210px",
        });
        setModalAdd (false)
      }else{
        Toast.fire({
          icon: "error",
          title: "Ocurrio un error al crear el esteticista",
          width: "210px",
        });
        setModalAdd (false)
      }
    }
  };
  return (
    <div className={S.cont}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={S.chooseSeccion}>
          <span>¿En que sección deseas hacer cambios?</span>
          <DropDownSetting
            options={secciones}
            onHandlerOption={onHandlerSeccion}
          />
        </div>
        {idxseccion !== "" ? (
          <img
            style={{ width: "30px", cursor: "pointer" }}
            src={add}
            alt=""
            onClick={() => setModalAdd(true)}
          />
        ) : null}
      </div>
      <div className={S.contCards}>
        <Cards
          categories={categories}
          seccion={seccion}
          idxseccion={idxseccion}
          setSeccion={setSeccion}
        />
      </div>
      {modalAdd ? (
        <ModalAdd
          idxseccion={idxseccion}
          categories={categories}
          setModal={setModalAdd}
          create={create}
        />
      ) : null}
    </div>
  );
}
