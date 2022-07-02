const nodemailer = require("nodemailer")
const smtpConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: { user: process.env.EMAIL,
            pass:process.env.EMAILPASS
         }
}
const sendRegisterEmail = async(reciver, textEmail)=>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
         await transporter.sendMail({
            from: process.env.EMAIL,
            to: reciver, 
            subject: "Registration Completed", 
            text: textEmail
          });
    }
    catch(e){
        console.log(e)
    }
}
const sendBookingEmail = async(reciver, textEmail, orderId)=>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
         await transporter.sendMail({
            from: process.env.EMAIL,
            to: reciver, 
            subject: "Booking Confirmed", 
            text: textEmail
          });
    }
    catch(e){
        console.log(e)
    }
}
const sendCancelBookingEmail = async(reciver, textEmail)=>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
         await transporter.sendMail({
            from: process.env.EMAIL,
            to: reciver, 
            subject: "Booking Cancelled", 
            text: textEmail
          });
    }
    catch(e){
        console.log(e)
    }
}
module.exports = { sendRegisterEmail, sendBookingEmail, sendCancelBookingEmail }