const express = require("express");
const app = express();
const path = require('path')

const { ESLint } = require("eslint");

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

// Server config

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})

// View engine setup
app.set('views', path.join(__dirname, '/views'));
console.log(__dirname)
app.set('view engine', 'ejs');

// Static folder setup
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('pages/index.ejs');
});


