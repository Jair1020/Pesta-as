import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
const ipcRenderer = window.ipcRenderer;
const doc = new jsPDF();
export const screenshot = (nameBill) => {
  html2canvas(document.querySelector("#factura"),{scale:5.5}).then( async (canvas) => {
    let img = canvas.toDataURL();
    let enlace = document.createElement('a');
    enlace.download = nameBill
    enlace.href = canvas.toDataURL();
    enlace.click();
    enlace.remove ()
    // const mail= await ipcRenderer.invoke ('SEND_MAIL', {nameBill:nameBill, img } )

    
    /* var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(img, 'PNG', 0, 0, width, height);
    doc.save(`${nameBill}.pdf`); */

  });

}


