const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hello");
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("Running in port 3000");
});
