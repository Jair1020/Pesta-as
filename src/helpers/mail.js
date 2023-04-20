var nodemailer = require("nodemailer");

const sendMail = ({nameBill, img}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "jair.avila1020@gmail.com",
      pass: "oibdyekztswhovuz"
    },
    port: 465,
    secure: true
  })
  var mail = {
    from: "jair.avila1020@gmail.com",
    to: "jair_p1020@hotmail.com",
    subject: "factura de pestañas",
    text: 'Hola......nodemailer.......',
    attachments: [
      {
        filename: `${nameBill}.xls`,
        path: img
      }
    ]
  }


  transporter.sendMail(mail, function (err, info){
    if(err){
      console.log (err)
    }else {
      console.log ('Email enviado exitosamente: ' + info.response )
    }
  } )


}

module.exports = {
  sendMail
}