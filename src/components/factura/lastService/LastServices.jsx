import React, { useEffect, useState } from "react";
import S from "./lastServices.module.css";
import arrowRight from "../../../assets/Img/arrowRight.png";
import arrowLeft from "../../../assets/Img/arrowLeft.png";
import eye from "../../../assets/Img/eye.png";
import obs from "../../../assets/Img/obs.png";
import savedisk from "../../../assets/Img/savedisk.png";
import Observations from "./Observations";
import { Toast } from "../../features.js/Toast";
import search from "../../../assets/Img/search.png";
import moment from "moment/moment";

const ipcRenderer = window.ipcRenderer;

export default function ({
  infoClient,
  onHandlerSeeBill,
  manyClients,
  handlerSearchBill,
}) {
  const [checked, setChecked] = useState(false);
  const [showObs, setShowObs] = useState(false);
  const [obse, setObse] = useState({});
  useEffect(() => {
    if (infoClient.length && !(obse.personal_obs || obse.technical_obs)) {
      setObse({
        personal_obs: infoClient[0].personal_obs,
        technical_obs: infoClient[0].technical_obs,
      });
    }
  }, [infoClient]);

  const [obsSaved, setObsSaved] = useState(true);
  const onHandlerClick = (e) => {
    setChecked(e.target.checked);
  };
  const onHandlerObs = (e) => {
    setObsSaved(false);
    setObse((o) => ({ ...o, [e.target.name]: e.target.value }));
  };
  const onHandlerSaveObs = async () => {
    let updated = await ipcRenderer.invoke("UPDATE_OBS_CLIENT", {
      ...obse,
      id: infoClient[0].id,
    });
    setObsSaved(true);
    Toast.fire({
      icon: "success",
      title: "Guardado",
      width: "250px",
    });
  };
  const getDiff = (e)=>{
    let fecha=  e
    const años = moment(new Date()).diff(fecha, 'years')
    const newDate1= new Date().setFullYear( new Date().getFullYear() - años)
    const meses = moment(newDate1).diff(fecha, 'month')
    const newDate2= new Date(newDate1).setMonth ( new Date().getMonth() - meses)
    const dias = moment (newDate2).diff (fecha, 'days')
    if (años){
      return `${años} años ${meses} meses ${dias} días`
    }else if (meses){
      return `${meses} meses ${dias} días`
    }
    return `${dias} días`

  }


  return (
    <>
      <input
        onClick={onHandlerClick}
        type="checkbox"
        id="btn-menu"
        className={S.btnMenu}
      />
      <label className={S.label} htmlFor="btn-menu">
        <img src={checked ? arrowLeft : arrowRight} alt="" />
      </label>
      <div className={S.container}>
        <div className={S.cont}>
          <nav>
            {!manyClients ? (
              <>
                <div className={S.divIcon}>
                  <span className={S.name}>
                    {infoClient.length
                      ? infoClient[0].name_client
                      : "El cliente no tiene servicios"}
                  </span>
                  {infoClient.length ? (
                    obsSaved ? (
                      <img
                        className={S.obsIcon}
                        src={obs}
                        alt=""
                        onClick={() => setShowObs(!showObs)}
                      />
                    ) : (
                      <img
                        className={S.saveIcon}
                        src={savedisk}
                        alt=""
                        onClick={onHandlerSaveObs}
                      />
                    )
                  ) : null}
                </div>
                {!showObs ? (
                  infoClient.map((e, idx) => (
                    <div key={idx}>
                      <div style={{display:'flex', gap:'10px'}} >
                        <span>{e.date.split ('-').reverse().join('/')}</span>
                        <span>{getDiff(e.date)}</span>
                      </div>
                      <span>{e.name_service}</span>
                      <span>{e.name_stylist}</span>
                      <span>
                        ${new Intl.NumberFormat("de-DE").format(e.price)}
                      </span>
                      <img
                        onClick={() => onHandlerSeeBill(e.id_bill)}
                        className={S.eye}
                        src={eye}
                        alt=""
                      />
                    </div>
                  ))
                ) : (
                  <Observations
                    obse={obse}
                    setObse={setObse}
                    onHandlerObs={onHandlerObs}
                  />
                )}
              </>
            ) : (
              infoClient.map((e, idx) => (
                <div key={idx}>
                  <span>{e.name_client}</span>
                  <span>{e.id}</span>
                  <span>{e.phone ? e.phone : ""}</span>
                  <img
                    onClick={() => handlerSearchBill(e.id)}
                    className={S.eye}
                    src={search}
                    alt=""
                  />
                  {/* {!saveBill && <img onClick={} src={check}  alt=""/> } */}
                </div>
              ))
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
