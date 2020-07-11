const express = require("express");
const app = express();
var cors = require('cors');
const multer = require("multer")
const {storage , checkFileType} = require("./controller/uploader");
const {RequestAdapter } = require("./helpers/request-adapter");
const {Mailer} = require("./controller/mailer")
const createError = require('http-errors')

let  upload = multer({
    storage : storage,
    limits: {fileSize: 10000000},
    fileFilter: (req, file, callback) => {
    checkFileType(file, callback)
    }
    }).any();

// MiddleWare
app.use(cors());


// Server config

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})

app.post('/', upload, async (req, res, next) => {
        // Parse request to an object
        const adaptedData = RequestAdapter({request: req})

        // New Mailer object
        const mailer = new Mailer({data: adaptedData})

        // Sends the mail using mailer method send()
        const send = await mailer.send()

        // Success & error handler
        if(send instanceof Error){
            next(send)
        } else {
            res.send(send)
        }
   
    
})

app.use((req ,res ,next) => {
    next(createError(404, 'Not Found'))
})

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})
