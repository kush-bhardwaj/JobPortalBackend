const nodemailer = require('nodemailer');
const MailTransporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"kushbhardwaj8800@gmail.com",
        pass:"uaqbavzgcbwqlskn"
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
    console.log("Mail Sent.")
}
module.exports = SentMail;