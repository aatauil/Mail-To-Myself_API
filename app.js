const express = require("express");
const app = express();
const db = require('./config/database')
const path = require('path')

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
    console.log("okkk")
    // res.render('pages/index.ejs');
});


