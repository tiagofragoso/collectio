const bodyParser = require("body-parser");

const routes = require("../api/routes/collections");

const loadExpress = (app) => {
    app.use(bodyParser.json());

    app.get("/health", function(req, res) {
        res.send("I'm alive");
    });

    app.use("/collections", routes);
};

module.exports = loadExpress;
