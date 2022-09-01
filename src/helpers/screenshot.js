import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
const doc = new jsPDF();
export const screenshot = (nameBill) => {
  html2canvas(document.querySelector("#factura")).then(canvas => {
    let img = canvas.toDataURL('image/png');
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(img, 'PNG', 0, 0, width, height);
    doc.save(`${nameBill}.pdf`);

  });

}


