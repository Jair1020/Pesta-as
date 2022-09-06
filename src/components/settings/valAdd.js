export const valAdd = ({ input, idxseccion }) => {
  let error = {}
  if (!Object.keys(input).length) {
    error.all = "Ingresar datos"
  }
  if (idxseccion === 0) {
    if (!input.id || !input.id.trim()) {
      error.id = "Ingresar Documento del esteticista"
    } else if (!/^[0-9]{1,15}$/.test(input.id)) {
      error.id = "El numero del documento debe ser numerico y un numero valido";
    } 
    if (!input.name_stylist || !input.name_stylist.trim()) {
      error.name_stylist = "Ingresar nombre del esteticista"
    }
    
    if (!input.email || !input.email.trim()) {
      error.email = "Ingresar email del esteticista"
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        input.email
      )
    ) {
      error.email = "El correo debe ser tipo info@info.com";
    }else if (input.email.length >30){
      error.email = "Correo demaciado largo";
    }
    if (input.phone && input.phone.trim().length>=20){
      error.phone = "Numero telefonico demaciado largo"
    }
  }
  if (idxseccion === 1) {
    if (!input.name_service || !input.name_service.trim()) {
      error.name_service = "Ingresar nombre del servicio"
    }
    if (!input.id_category){
      error.category='Seleccion la categoria del servicio'
    }
  }
  if (idxseccion === 2) {
    if (!input.name_product || !input.name_product.trim()) {
      error.name_product = "Ingresar nombre del producto"
    }
    if (!input.id_category){
      error.category='Seleccion la categoria del producto'
    }
  }
  return error
} 