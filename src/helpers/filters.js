export  const valUnitarios = ({ services, expenses }) => {
  let valUnitarios = {};
  let obj = {};

  valUnitarios.efectivo = services.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = acc + (e.catch ? e.catch : 0);
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};
  valUnitarios.dav = services.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.transferDav ? e.transferDav : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};

  valUnitarios.banc = services.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.transferBanc ? e.transferBanc : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);
  obj = {};

  valUnitarios.targe = services.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.card ? e.card : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);

  valUnitarios.price_Total = services.reduce((acc, e) => {
    acc = (e.price ? e.price : 0) + acc;
    return acc;
  }, 0);

  obj = {};
  valUnitarios.debt = services.reduce((acc, e) => {
    if (!obj[e.id_bill]) {
      acc = (e.debt ? e.debt : 0) + acc;
      obj[e.id_bill] = true;
    }
    return acc;
  }, 0);

  valUnitarios.expensess = expenses.reduce((acc, e) => {
    acc = acc + (e.expense_price ? parseInt(e.expense_price) : 0);
    return acc;
  }, 0);
  valUnitarios.stylist_total = services.reduce((acc, e) => {
    if (e.percentage) {
      acc = acc + (e.price * (e.percentage / 100))
    }
    return acc
  }, 0)
  valUnitarios.total_neto = valUnitarios.price_Total -
    valUnitarios.debt -
    valUnitarios.expensess -
    valUnitarios.stylist_total;


  return valUnitarios
}


export const filterServ = ({filterServices, filterStylists, services})=>{
  const filters = services.filter ((e)=>{

    return !!(filterServices[e.name_service?e.name_service:e.name_product] && (e.name_stylist?filterStylists[e.name_stylist]: !Object.values (filterStylists).includes(true)))
  })
  return filters
}


export const gainStylist = ({serviceFilters})=>{
  let stylist_gain = [];

  serviceFilters.forEach((e) => {
    if (e.name_stylist) {
      let idx = stylist_gain.findIndex(
        (s) => s.name_stylist === e.name_stylist
      );

      if (idx >= 0) {
        stylist_gain[idx].gain =
          stylist_gain[idx].gain + e.price * (e.percentage / 100);
      } else {
        let obj = {
          name_stylist: e.name_stylist,
          gain: e.price * (e.percentage / 100),
        };
        stylist_gain.push({ ...obj });
      }
    }
  });
  return stylist_gain
}


