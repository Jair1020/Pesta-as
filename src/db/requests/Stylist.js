const {Stylist} = require ('../db')

 const getStylists = async ()=>{
  try{
    const stylists = await Stylist.findAll ({
      where:{
        disabled:false
      },
      raw: true
    })
    return stylists
  }catch (err){
    console.log (err)
    return (err)
  }
}

const updateStylist = async (stylist)=>{
  try{ 
    const updateStylist= await Stylist.update (stylist,{
      raw:true,
      where:{
        id:stylist.id
      }   
    })
    return true
  }catch (err){
    console.log (err)
    throw new Error (err)
  }
}
const createStylist = async (stylist)=>{
  try{
    const newStylist = await Stylist.create (stylist)
    return true
  }catch (err){
    console.log(err)
    throw new Error(err)
  }
}

module.exports = {
  getStylists,
  updateStylist,
  createStylist
}