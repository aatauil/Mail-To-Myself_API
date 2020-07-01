const express = require("express");
const db = require('./config/database')
const server = require('./config/server');
const path = require('path')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));



// Index

app.get('/', (req, res) => {
    res.render('index');
});


