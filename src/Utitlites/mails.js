const nodemailer = require('nodemailer');
const MailTransporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.Email_User,
        pass:process.env.Email_Pass
    }
})
async function SentMail(to, subject , text , html) {
    const info = await MailTransporter.sendMail({
        from:"kushbhardwaj8800@gmail.com",
        to:to,
        subject:subject,
        text:text,
        text:text,
        html:html
    })
}
module.exports = SentMail;