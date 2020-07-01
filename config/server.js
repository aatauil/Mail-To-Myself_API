// Server Connection
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
})
