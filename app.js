const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
import { ESLint } from "eslint";
import Mailer from "./controller/mailer";
var cors = require('cors');

const multer = require('multer');



// Multer Config
const storage =   multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
   storage : storage,
   limits: {fileSize: 10000000},
   fileFilter: (req, file, callback) => {
    checkFileType(file, callback)
   }
  }).single('SendToMyself');

// Check File Type
function checkFileType(file, callback){
  // Allowed ext
  const fileTypes = /jpeg|jpeg|png|gif/;
  const extName = fileTypes.text(path.extname(file.originalname).toLowerCase())
  // Checkk mime
  const mimeType = fileTypes.test(file.mimeType)

  if(mimeType && extName){
    return callback(null, true);
  } else {
    callback('Error: This file type is not allowed to be send through mail.')
  }
}

// -------------------------------------------------------------------------------------------

// ESLINT
(async function main() {
  // 1. Create an instance.
  const eslint = new ESLint();

  // 2. Lint files.
  const results = await eslint.lintFiles(["./**/*.js"]);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4. Output it.
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});

// -------------------------------------------------------------------------------------------

// Server config

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})

// -------------------------------------------------------------------------------------------

// View engine setup + static folder

app.engine('.hbs', exphbs({
  extname: '.hbs', 
  defaultLayout: 'main'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

// MiddleWare
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

// -------------------------------------------------------------------------------------------

// Routing
app.get('/api', (req, res) => {
    console.log(req.body)
    res.json({ msg: "success"});
});


// -------------------------------------------------------------------------------------------
// Handlers
app.post('/api', (req,res) => {
  upload(req,res,(err) => {
    if(err) {
        return res.end(`${err}`);
    }
    console.log(req.file)
    res.end("File is uploaded");
  });
  console.log(req.body)
  const newMail = new Mailer(req.body.text, req.body.email)
  newMail.params();
  newMail.main();
})
