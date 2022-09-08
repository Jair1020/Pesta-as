
const { Bill, BillChange  } = require("../db")


const createBillChange = async (change)=>{
  try{
    console.log (change)
    let Billchange= await BillChange.create(change)
    await Billchange.setBill (change.idBill)
    return true
    
  }catch (err){
    console.log (err)
    throw new Error ('Error al crear el cambio')
  }
}

const getBillChanges = async ()=>{
  try{
    let changes= await BillChange.findAll ({
      whre:{
        dateChange: new Date ()
      }
    })
    console.log (changes)
    return changes

  }catch (err){
    console.log (err)
    throw new Error ('Error al obtener los cambios a facturas')
  }


}


module.exports = {
  createBillChange,
  getBillChanges
}