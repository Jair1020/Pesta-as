
export const clientVal = (client) => {
  let error = {};
  if (!Object.keys(client).length) {
    error.all = "Ingresar datos del cliente"
  }

  if (!client.id || !client.id.trim()) {
    error.id = "Ingresar Documento del cliente"
  } else if (!/^[0-9]{1,14}$/.test(client.id)) {
    error.id = "La identificación debe ser numerica y un numero valido";
  }

  if (!client.name_client || !client.name_client.trim()) {
    error.name_client = "Ingresar nombre del cliente"
  }else if (client.name_client.trim().length>40){
    error.name_client = "Nombre demaciado largo"
  }

  if (!client.email || !client.email.trim()) {
    error.email = "Ingresar email del cliente"
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      client.email
    )
  ) {
    error.email = "El correo debe ser tipo info@info.com";
  }else if (client.email.length >30){
    error.email = "Correo demaciado largo";
  }

  if (client.phone && client.phone.trim().length>=20){
    error.phone = "Numero telefonico demaciado largo"
  }


  return error
}