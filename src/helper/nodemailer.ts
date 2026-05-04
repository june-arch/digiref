import {createTransport} from 'nodemailer'

let transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
 })

 export const sendEmail = async (msg: string, user: any) => {
    const mailOptions = {
        to: user.email, // List of recipients
        subject: 'no-reply coldstorage monitoring', // Subject line
        text: msg, // Plain text body
   };
   try {
    const result = await transport.sendMail(mailOptions);
    return {error: null, data: result}
   } catch (error) {
    return {error: error, data: null}
   }
 }

 export const sendEmailHtml = async (html: any, email: string) => {
  const mailOptions = {
      to: email, // List of recipients
      subject: 'no-reply coldstorage monitoring', // Subject line
      html, // Plain text body
 };
 try {
  const result = await transport.sendMail(mailOptions);
  return {error: null, data: result}
 } catch (error) {
  return {error: error, data: null}
 }
}