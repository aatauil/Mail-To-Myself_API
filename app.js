const express = require("express");
const app = express();
const path = require('path')
import { ESLint } from "eslint";
import Mailer from "./controller/mailer"

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
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// -------------------------------------------------------------------------------------------

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

// -------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});

app.post('', (req) => {

  const newMail = new Mailer(req.body.text, req.body.email)
  newMail.params();
  newMail.main();
})


