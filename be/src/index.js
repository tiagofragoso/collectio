const express = require("express");
const { PORT } = require("./config");
const loadApp = require("./loaders");

const app = express();

const startServer = async () => {
    await loadApp(app);

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Running in port ${PORT}`);
    });
};

startServer();
