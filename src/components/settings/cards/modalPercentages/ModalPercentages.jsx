import React from "react";
import S from "./modalPercentages.module.css";
import x from "../../../../assets/Img/x.svg";

export default function ModalPercentages({
  setModal,
  percentages,
  setPercentages,
}) {
  const onHandlerInput = (e) => {
    if (!e.nativeEvent.inputType){
      let num = parseInt (e.target.value)
      if (num<0 || isNaN (num)) num=0
      if (num>100) num=100
      let idCat= parseInt (e.target.name)
      let idxper= percentages.findIndex(e=>e.categoryId===idCat)
      let per = [...percentages]
      per[idxper].percentage=num
      setPercentages (per)
    }
  };

  return (
    <>
      <div className={S.contMainModal}>
        <div className={S.contModal}>
          <div className={S.maincont}>
          <img
            onClick={() => setModal(false)}
            className={S.volver}
            src={x}
            alt=""
          />
            <table>
              {percentages.map((e, idx) => (
                <tbody key={idx} >
                  <tr>
                    <th>{e.name_category}:</th>
                    <td>
                      <input
                        className={S.input}
                        onChange={onHandlerInput}
                        name={e.categoryId}
                        type="number"
                        step={5}
                        value={e.percentage?e.percentage:15}
                        min="0"
                        max="100"
                      />
                      %
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className={S.modalBack}></div>
    </>
  );
}
// [
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 1, name_category:asdasdasd},
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 2 },
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 3 },
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 4 },
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 5 },
//   [1]   { percentage: 15, stylistId: '1010215141', categoryId: 7 }
//   [1] ]
