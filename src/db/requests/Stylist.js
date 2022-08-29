const {Stylist} = require ('../db')

 const getStylists = async ()=>{
  try{
    const stylists = await Stylist.findAll ({
      raw: true
    })
    return stylists
  }catch (err){
    console.log (err)
    return (err)
  }
}

module.exports = {
  getStylists
}