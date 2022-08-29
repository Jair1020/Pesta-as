const {Service} = require ('../db.js')

 const getServices = async ()=>{
  try{
    const services = await Service.findAll ({
      attributes: ['id', 'name_service', 'price'],
      raw: true
    })
    // console.log (services)
    return services
  }catch (err){
    console.log (err)
    return (err)
  }
}

module.exports = {
  getServices
}