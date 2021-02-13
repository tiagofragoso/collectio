const loadExpress = require("./express");
const { connect: loadMongoDB } = require("./db");

const loadApp = async (app) => {
    await loadMongoDB();
    await loadExpress(app);
};

module.exports = loadApp;
