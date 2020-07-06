const express = require("express");
const app = express();
var cors = require('cors');
const { upload } = require("./config/multer");
const bodyParser = require("body-parser")

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

app.post('/', (req,res) => {
    upload(req, res, (err) => {
        if (err) {
            // An error occurred when uploading to server memory
            return res.status(502).json(err) ;
        }
        console.log(req.body);
        console.log(req.files);
        res.send("sucess")
  })
})


