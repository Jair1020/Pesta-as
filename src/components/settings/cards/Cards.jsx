import React, { useEffect, useState } from "react";
import { Toast } from "../../features.js/Toast";
import DropDownSetting from "../dropDownSetting/DropDownSetting";
import savedisk from "../../../assets/Img/savedisk.png";
import editdoc from "../../../assets/Img/editdoc.png";
import x from "../../../assets/Img/x.svg";
import S from "./cards.module.css";
import Swal from "sweetalert2";
const ipcRenderer = window.ipcRenderer;

export default function Cards({ seccion, idxseccion, categories, setSeccion }) {
  const [input, setInput] = useState({});
  const keys =
    idxseccion === 0
      ? {
          name: "name_stylist",
          email: "email",
          phone: "phone",
        }
      : idxseccion === 1
      ? {
          name: "name_service",
          price: "price",
          name_category: "name_category",
        }
      : {
          name: "name_product",
          price: "price",
          name_category: "name_category",
        };
  useEffect(() => {
    setInput({});
  }, [idxseccion]);
  const onHandlerInput = (e) => {
    let value;
    if (e.target.name === "price") {
      value = e.target.value.replace(/[.]/g, "");
    } else value = e.target.value;
    let elements = [...seccion];
    let indice = elements.findIndex((e, idx) => e.id === input.id);
    elements[indice] = { ...elements[indice], [e.target.name]: value };
    setSeccion([...elements]);
    setInput((i) => ({ ...i, [e.target.name]: value }));
  };
  const onHandlerCategory = (id_category) => {
    let id = parseInt(id_category);
    setInput((i) => ({ ...i, id_category: id }));
  };
  const elementToEdit = (e) => {
    let id = parseInt(e.target.id);
    let element = seccion.find((e) => parseInt(e.id) === id);

    let inputt =
      idxseccion === 0
        ? {
            name_stylist: element.name_stylist,
            email: element.email,
            phone: element.phone,
          }
        : idxseccion === 1
        ? {
            name_service: element.name_service,
            price: element.price,
            id_category: element["category.id"],
          }
        : {
            name_product: element.name_product,
            price: element.price,
            id_category: element["category.id"],
          };
    inputt.id = element.id;
    setInput((e) => ({ ...inputt }));
  };
  const saveInput = async () => {
    let updated;
    if (idxseccion === 0) {
      updated = await ipcRenderer.invoke("UPDATE_STYLIST", input);
    } else if (idxseccion === 1) {
      updated = await ipcRenderer.invoke("UPDATE_SERVICE", input);
    } else {
      updated = await ipcRenderer.invoke("UPDATE_PRODUCT", input);
    }
    if (updated === true) {
      Toast.fire({
        icon: "success",
        title: "Actualizado",
        width: "220px",
      });
      setInput({});
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al actualizar",
      });
      setInput({});
    }
  };
  const deletElement = (e) => {
    Swal.fire({
      title: "Confirmación",
      text: "Estas seguro de desactivar este elemento?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let updated;
        if (idxseccion === 0) {
          updated = await ipcRenderer.invoke("UPDATE_STYLIST", {
            disabled: true,
            id: e.target.id,
          });
        } else if (idxseccion === 1) {
          updated = await ipcRenderer.invoke("UPDATE_SERVICE", {
            disabled: true,
            id: e.target.id,
          });
        } else {
          updated = await ipcRenderer.invoke("UPDATE_PRODUCT", {
            disabled: true,
            id: e.target.id,
          });
        }
        if (updated === true) {
          let newSeccion = [...seccion].filter(
            (s) => parseInt(s.id) !== parseInt(e.target.id)
          );
          setSeccion ([...newSeccion])
          Toast.fire({
            icon: "success",
            title: "Elemento desactivado",
          });
          setInput ({})
        }else{
          Toast.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
          setInput ({})
        }
      }
    });
  };
  return seccion.map((e) => (
    <div
      className={S.cont}
      key={e.id}
      style={e.id === input.id ? {} : { pointerEvents: "none" }}
    >
      <div className={S.icons}>
        {e.id === input.id ? (
          <>
            <img src={savedisk} alt="" onClick={saveInput} />
            <img id={e.id} src={x} alt="" onClick={deletElement} />
          </>
        ) : !input.id ? (
          <img id={e.id} onClick={elementToEdit} src={editdoc} alt="" />
        ) : null}
      </div>
      <div>
        <label>Nombre:</label>
        <input
          onChange={onHandlerInput}
          name={keys.name}
          type="text"
          value={e[keys.name]}
        />
      </div>
      <div>
        <label>{idxseccion ? "Precio:" : "Email:"}</label>
        <input
          onChange={onHandlerInput}
          name={keys.price ? keys.price : keys.email}
          value={
            keys.price
              ? new Intl.NumberFormat("de-DE").format(e[keys.price])
              : e[keys.email]
          }
          type="text"
        />
      </div>
      <div
        style={
          idxseccion
            ? { flexDirection: "row", alignItems: "center", gap: "10px" }
            : {}
        }
      >
        <label>{idxseccion ? "Categoria:" : "Telefono:"}</label>
        {idxseccion ? (
          <DropDownSetting
            onHandlerOption={onHandlerCategory}
            options={[...categories].filter(
              (c) => c.name_category !== e["category.name_category"]
            )}
            category={e["category.name_category"]}
          />
        ) : (
          <input
            onChange={onHandlerInput}
            name={keys.phone}
            value={e[keys.phone]}
            type="text"
          />
        )}
      </div>
    </div>
  ));
}
