
export const clientVal = (client) => {
  let error = {};
  if (!Object.keys(client).length) {
    error.all = "Ingresar datos del cliente"
  }
  if (!client.id || !client.id.trim()) {
    error.id = "Ingresar Documento del cliente"
  } else if (!/^[0-9]{1,12}$/.test(client.id)) {
    error.id = "La identificación debe ser numerica";
  }
  if (!client.name_client || !client.name_client.trim()) {
    error.name_client = "Ingresar nombre del cliente"
  }
  if (!client.email || !client.email.trim()) {
    error.email = "Ingresar email del cliente"
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      client.email
    )
  ) {
    error.email = "El correo debe ser tipo info@info.com";
  }
  return error
}