const nodemailer = require('nodemailer');


const mailSender = async(email,title,body) =>{
    try{
       let tranporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user: process.env.MAIL_USER,
            password: process.env.MAIL_PASS,
        }
       })

       let info = await tranporter.sendMail({
        from: "StudyGeniues || By - Khan",
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
       })
       console.log(info);
       return info;
       
    }catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;