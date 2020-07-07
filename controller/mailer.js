import MailAdapter from "../helpers/mail-adapter";

const nodemailer = require("nodemailer");
const createError = require('http-errors')


export class Mailer {
    constructor(data){
        this.text = data.text;
        this.email = data.email;
    
    }


    async send() {         
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
            },
        })

        let details = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: this.email, // list of receivers
            subject: "testing node mailer ✔", // Subject line
            text: this.text, // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        try{
            let info = await transporter.sendMail(details);
            let adapted = MailAdapter(info)
            return adapted
        }catch(err){
            return createError(400, err.message)
        }
        // send mail with defined transport object
        

      
}}