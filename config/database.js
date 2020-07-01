// Database Connection
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0-vljfo.mongodb.net/users?retryWrites=true&w=majority`, {useNewUrlParser: "true", useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database succesfully connected")
});
