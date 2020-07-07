const express = require("express");
const app = express();
var cors = require('cors');
// const { upload } = require("./config/multer");
const bodyParser = require("body-parser");
const { default: adaptRequest } = require("./helpers/adapt-request");
const {Mailer} = require("./controller/mailer")
const createError = require('http-errors')

// MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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

// Server config

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})

app.post('/', async (req,res) => {
        const adaptedData = adaptRequest(req)
        const mailer = new Mailer(adaptedData)
        const send = await mailer.send()
        res.send("ok")
        


})


