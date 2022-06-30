const nodemailer = require("nodemailer")
const smtpConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: { user: process.env.EMAIL,
            pass:process.env.EMAILPASS
         }
}
const sendEmailMe = async(reciver, textEmail)=>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
         await transporter.sendMail({
            from: process.env.EMAIL,
            to: reciver, 
            subject: "Hello ✔", 
            text: textEmail
          });
    }
    catch(e){
        console.log(e)
    }
}

module.exports = sendEmailMe