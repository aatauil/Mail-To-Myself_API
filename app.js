const express = require("express");
const app = express();
var cors = require('cors');
// const { upload } = require("./config/multer");
const bodyParser = require("body-parser");
const { default: RequestAdapter } = require("./helpers/request-adapter");
const {Mailer} = require("./controller/mailer")
const createError = require('http-errors')


// MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));




// Server config

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})

app.post('/send', async (req,res,next) => {
        const adaptedData = RequestAdapter(req)
        const mailer = new Mailer(adaptedData)
        const send = await mailer.send()
        if(send instanceof Error){
            next(send)
        }
        res.send(send)
    
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
