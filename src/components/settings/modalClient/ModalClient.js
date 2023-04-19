import React, { useState } from 'react'
import S from './modalClient.module.css'
import search from '../../../assets/Img/search.png'
import x from '../../../assets/Img/x.svg'
import { Toast } from "../../features.js/Toast";

const ipcRenderer = window.ipcRenderer;

export default function ModalClient({setModalClient}) {
  const [input, setInput] = useState('')
  const [client, setClient] = useState('')
  const [ids, setIds] = useState({})

  const onHandlerInput = (e) => {
    setInput(e.target.value)
  }
  const onSearch = async () => {
    let clientFound = await ipcRenderer.invoke("GET_ONE_CLIENT", input)
    if (clientFound) {
      setClient(clientFound)
      setIds(s => ({ ...s, previous: clientFound.id }))
      Toast.fire({
        icon: 'success',
        title: "Cliente encontrado",
      })
    } else {
      Toast.fire({
        icon: "info",
        title: "No se encontro cliente",
      });
    }
  }
  const onChangeIds = (e) => {
    setIds({ previous: client.id, new: e.target.value })
  }

  const setMigrate = async () => {
    let idMigrated = await ipcRenderer.invoke("UPDATE_IDCLIENT", ids)
    if (idMigrated === true) {
      Toast.fire({
        icon: 'success',
        title: "Id migradó",
      })
      setInput('')
      setClient('')
      setIds({})
    } else {
      Toast.fire({
        icon: "info",
        title: idMigrated,
      });
    }
  }

  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <div className={S.maincont}>
          <img src={x} style={{ position: "absolute", right: 20, cursor:  'pointer' }} alt="" onClick={()=>setModalClient(false)} />
            <h3>
              Por favor ingresar el id del cliente
            </h3>
            <div className={S.input} >
              <input
                onChange={onHandlerInput}
                type="number"
                value={input}
              />
              <img
                id='searchIdClient'
                style={{ display: 'inline-block', cursor: 'pointer', height: 20, marginInline: 20 }}
                onClick={onSearch}
                src={search}
                alt=""
              />
            </div>
            {client ? <div className={S.cont} >
              <div>
                <label>Nombre:</label>
                <span>{client.name_client}</span>
              </div>
              <div>
                <label>Telefono:</label>
                <span>{client.phone}</span>
              </div>
              <div>
                <label>Email:</label>
                <span>{client.email}</span>
              </div>
              <div>
                <label>Nuevo Id:</label>
                <input
                  onChange={onChangeIds}
                  value={ids.new}
                  type="number"
                />
              </div>
              <button
                onClick={setMigrate}
              >
                Migrar Id
              </button>
            </div> : null}
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  )
}
