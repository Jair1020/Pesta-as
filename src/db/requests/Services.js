const {Service,Category} = require ('../db.js')

 const getServices = async ()=>{
  try{
    const services = await Service.findAll ({
      raw: true,
      where:{
        disabled:false
      },
      attributes: ['id', 'name_service','price'],
      include: [{
        model: Category,
        attributes: ['name_category','id']
      }],
    })
    console.log (services)
    return services
  }catch (err){
    console.log (err)
    return (err)
  }
}
const updateService = async (service)=>{
  try{ 
    const updateService= await Service.update (service,{
      raw:true,
      where:{
        id:service.id
      }   
    })
    if (!service.disabled){
      const instanceService = await Service.findByPk (service.id,{raw:false}) 
      await instanceService.setCategory(service.id_category)
    }
    return true
  }catch (err){
    console.log (err)
    throw new Error (err)
  }
}
const createService = async (service)=>{
  try{
    const newService = await Service.create (service)
    await newService.setCategory (service.id_category)
    return true
  }catch (err){
    console.log(err)
    throw new Error(err)
  }
}


module.exports = {
  getServices,
  updateService,
  createService
}

