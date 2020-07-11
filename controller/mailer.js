import MailAdapter from "../helpers/mail-adapter";

const nodemailer = require("nodemailer");
const createError = require('http-errors')


export class Mailer {
    constructor({data}){
        this.text = data.text;
        this.email = data.email;
        this.original = data.original
        this.modified = data.modified
    
    }




    async send() {     
        console.log(this.original, this.modified)
        console.log("email is :" + this.email)    
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "sedrick.rodriguez@ethereal.email", // generated ethereal user
            pass: "P5tSeJ3yphQmfMaNQQ", // generated ethereal password
            },
        })

        let details = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "sedrick.rodriguez@ethereal.email", // list of receivers
            subject: "testing node mailer ✔", // Subject line
            text: this.text, // plain text body
            html: "<b>Hello world?</b>", // html body
            attachments: [
                {   // file on disk as an attachment
                    filename: this.original,
                    path: this.modified // stream this file
                }
            ]
        }

        try{
            let info = await transporter.sendMail(details);
            let adapted = MailAdapter(info)
            console.log("Email send Succesfully")
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return adapted
        }catch(err){
            console.log("Error while sending e-mail")
            return createError(400, err.message)

        }
        // send mail with defined transport object
        

      
}}