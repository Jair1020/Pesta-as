import React, { useEffect, useState } from "react";
import S from "../factura.module.css";
import Dropdown from "../Dropdown";
import x from "../../../assets/Img/x.svg";
const ipcRenderer = window.ipcRenderer;

export default function Row({ services, setServices, saveBill, screenShot }) {
  const [servicios, setServicios] = useState([]);
  const [stylists, setStylist] = useState([]);
  useEffect(() => {
    async function getdata() {
      let services = await ipcRenderer.invoke("GET_SERVICES");
      let stylists = await ipcRenderer.invoke("GET_STYLISTS");
      let products = await ipcRenderer.invoke("GET_PRODUCTS");
      let serv = services.map((e) => {
        return { ...e, name: e.name_service, service: true };
      });
      let prods = products.map((e) => {
        return { ...e, name: e.name_product, service: false };
      });
      let styli = stylists.map((e) => {
        return { ...e, name: e.name_stylist };
      });
      setServicios([
        ...serv.sort((a, b) => a.name.localeCompare(b.name)),
        ...prods.sort((a, b) => a.name.localeCompare(b.name)),
      ]);
      setStylist(styli.sort((a, b) => a.name.localeCompare(b.name)));
    }
    getdata();
  }, []);
  useEffect((e) => {}, []);
  const onHandlerService = (e) => {
    let service;
    if (e.target.attributes[2].value === "true") {
      service = [...servicios].find(
        (ser) => parseInt(e.target.id) === parseInt(ser.id) && ser.service
      );
      service.num_order = e.target.attributes[1].value;
    } else {
      service = [...servicios].find(
        (ser) => parseInt(e.target.id) === parseInt(ser.id) && !ser.service
      );
      service.num_order = e.target.attributes[1].value;
    }
    let newService = { ...services[service.num_order], ...service };
    if (parseInt(newService.price) > 0) {
      let price_Total =
        parseInt(newService.price) *
          parseInt(newService.amount ? newService.amount : 1) -
        parseInt(newService.sale ? newService.sale : 0);
      newService = {
        ...newService,
        price_Total,
        amount: newService.amount ? newService.amount : 1,
        sale: newService.sale ? newService.sale : 0,
      };
    }
    const servicess = [...services];
    servicess[service.num_order] = newService;
    setServices((services) => servicess);
  };

  const onHandlerStylist = (e) => {
    const service = {
      name_stylist: e.target.outerText,
      id_stylist: e.target.id,
      num_order: e.target.attributes[1].value,
    };
    const newService = { ...services[service.num_order], ...service };
    const servicess = [...services];
    servicess[service.num_order] = newService;
    setServices((services) => servicess);
  };
  const onHandlerChange = (e) => {
    let numero = e.target.value.replace(/[.]/g, "");
    console.log(numero);
    let service;
    if (e.target.name === "amount") {
      let cant =
        parseInt(numero) <= 0 || isNaN(parseInt(numero))
          ? 1
          : parseInt(numero) > 100
          ? 100
          : parseInt(numero);
      service = {
        amount: cant,
        num_order: e.target.id,
      };
    } else if (e.target.name === "sale") {
      let sale =
        parseInt(numero) < 0 || numero === ""
          ? 0
          : parseInt(numero) >
            services[e.target.id].price * services[e.target.id].amount
          ? services[e.target.id].price * services[e.target.id].amount
          : parseInt(numero);
      service = {
        sale: sale,
        num_order: e.target.id,
      };
    }
    let newService = { ...services[service.num_order], ...service };

    if (
      parseInt(newService.price) > 0 &&
      parseInt(newService.amount) > 0 &&
      parseInt(newService.sale) >= 0
    ) {
      let price_Total =
        parseInt(newService.price) * parseInt(newService.amount) -
        parseInt(newService.sale);
      newService = { ...newService, price_Total };
    }
    const servicess = [...services];
    servicess[service.num_order] = newService;
    setServices((services) => servicess);
  };
  const onHandlerDelete = (e) => {
    let newServices = [...services].filter((ser, idx) => {
      return parseInt(e.target.id) !== idx;
    });
    setServices(newServices);
  };

  return services.map((e, idx) => (
    <div
      key={idx}
      style={idx % 2 === 0 ? { backgroundColor: "#fbdada" } : {}}
      className={S.rows}
    >
      {!e.saved && e.id ? (
        <button id={idx} onClick={onHandlerDelete} className={S.x}>
          <img src={x} alt="" />
        </button>
      ) : null}
      <div className={S.contDesc}>
        {saveBill ? (
          <Dropdown
            idx={idx}
            options={
              e.saved
                ? servicios.filter((ser) => ser.service === e.service)
                : servicios
            }
            onHandlerOption={onHandlerService}
            services={true}
            justServices={
              e.saved ? (e.service ? "services" : "products") : "both"
            }
          />
        ) : null}
        <span>{e.name || ""}</span>
      </div>
      <input
        style={screenShot ? { height: "20px" } : {}}
        disabled={!saveBill || !e.id}
        className={S.cantColumn}
        type="number"
        value={e.amount ? e.amount : ""}
        id={idx}
        onChange={onHandlerChange}
        name="amount"
      />
      <div className={S.contEst}>
        {saveBill && e.service ? (
          <Dropdown
            idx={idx}
            options={stylists}
            onHandlerOption={onHandlerStylist}
          />
        ) : null}
        <span>{e.name_stylist || ""}</span>
      </div>
      <span className={S.Punid}>
        {e.price ? "$ " + new Intl.NumberFormat("de-DE").format(e.price) : ""}
      </span>
      <input
        style={screenShot ? { height: "20px" } : {}}
        disabled={!saveBill || !e.id}
        className={S.descuento}
        value={
          typeof e.sale === "number"
            ? new Intl.NumberFormat("es-CO").format(e.sale)
            : ""
        }
        id={idx}
        onChange={onHandlerChange}
        name="sale"
      />
      <span className={S.totalRow}>
        {e.price_Total || e.price_Total === 0
          ? "$ " + new Intl.NumberFormat("de-DE").format(e.price_Total)
          : ""}
      </span>
    </div>
  ));
}
