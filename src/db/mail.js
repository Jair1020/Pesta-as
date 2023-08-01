var nodemailer = require("nodemailer");
require('dotenv').config()
const {
  MAIL_HOST,
  MAIL_USER,
  MAIL_TOKEN,
  MAIL_PORT
} = process.env;


console.log (MAIL_HOST,
MAIL_USER,
MAIL_TOKEN,
MAIL_PORT)

const sendMail = ({ nameBill, img }) => {
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    auth: {
      user: MAIL_USER,
      pass: MAIL_TOKEN
    },
    port: MAIL_PORT,
    secure: true
  })
  var mail = {
    from: MAIL_USER,
    to: '',
    subject: "factura de pestañas",
    text: 'Hola......nodemailer.......',
    attachments: [
      {
        filename: `${nameBill}.png`,
        path: img
      }
    ]
  }


  transporter.sendMail(mail, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Email enviado exitosamente: ' + info.response)
    }
  })


}

module.exports = {
  sendMail
}