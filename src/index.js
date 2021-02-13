const express = require("express");

const loadApp = require("./loaders");

const app = express();

const startServer = async () => {
    await loadApp(app);

    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log("Running in port 3000");
    });
};

startServer();
