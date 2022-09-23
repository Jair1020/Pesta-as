import React, { useEffect, useState } from "react";
import DropDownFilters from "./dropDownfilters/DropDownFilters";
import S from "./filters.module.css";
const ipcRenderer = window.ipcRenderer;

export default function Filters({
  dates,
  setDates,
  onHandlerFilter,
  setFilterservices,
  setFilterStylists,
  filterServices,
  filterStylists,
}) {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  const request = async () => {
    let services = await ipcRenderer.invoke("GET_ALL_SERVICES");
    const products = await ipcRenderer.invoke("GET_ALL_PRODUCTS");
    setServices([...services.sort ((a, b) => a.name_service.localeCompare(b.name_service)), ...products.sort ((a, b) => a.name_product.localeCompare(b.name_product) )]);
    let stylists = await ipcRenderer.invoke("GET_ALL_STYLISTS");
    setStylists(stylists);
  };
  useEffect(() => {
    request();
  }, []);
  const onChangeDates = (e) => {
    let newDates = [...dates];
    newDates[e.target.id] = e.target.value;
    setDates(newDates);
  };
  const onHandlerOptionServices = ({ id, name }) => {
    setFilterservices((e) => ({ ...e, [name]: !e[name] }));
  };
  const onHandlerOptionStylists = ({ name }) => {
    setFilterStylists((e) => ({ ...e, [name]: !e[name] }));
  };

  const setAllFilters = (e)=>{
    if (e === 'stylists'){
      stylists.map ((e)=>{
        setFilterStylists((s) => ({ ...s, [e.name_stylist]: true }))
      })
    }
    if (e === 'services'){
      services.map ((e)=>{
        setFilterservices((s) => ({ ...s, [e.name_service?e.name_service:e.name_product]: true }))
      })
    }
  }
  const setClearFilters = (e)=>{
    if (e === 'stylists'){
      stylists.map ((e)=>{
        setFilterStylists((s) => ({ ...s, [e.name_stylist]: false }))
      })
    }
    if (e === 'services'){
      services.map ((e)=>{
        setFilterservices((s) => ({ ...s, [e.name_service?e.name_service:e.name_product]: false }))
      })
    }
  }

  return (
    <div className={S.contFilter}>
      <div className={S.fecha}>
        <div>
          <label> Desde:</label>
          <input id="0" type="date" value={dates[0]} onChange={onChangeDates} />
        </div>
        <div>
          <label> Hasta:</label>
          <input id="1" type="date" value={dates[1]} onChange={onChangeDates} />
        </div>
      </div>
      <div>
        {/* <label>Escoge esteticistas</label> */}
        <div className={S.contButtons} >
          <button onClick={()=>setAllFilters('stylists')} >Todos</button>
          <button onClick={()=>{setClearFilters('stylists')}}>Limpiar</button>
        </div>
        <DropDownFilters
          options={stylists}
          stylists={true}
          onHandlerOption={onHandlerOptionStylists}
          filters={filterStylists}
        />
      </div>
      <div>
        {/* <label>Escoge servicios</label> */}
        <div className={S.contButtons} >
          <button onClick={()=>setAllFilters('services')} >Todos</button>
          <button onClick={()=>{setClearFilters('services')}}>Limpiar</button>
        </div>
        <DropDownFilters
          options={services}
          onHandlerOption={onHandlerOptionServices}
          filters={filterServices}
        />
      </div>
      <button className={S.filt} onClick={onHandlerFilter}>Filtrar</button>
    </div>
  );
}
