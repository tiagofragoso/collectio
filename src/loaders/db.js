const mongoose = require("mongoose");

const { DB_URL, DB_NAME } = require("../config/dotenv");

const connect = () => {
    const options = {
        dbName: DB_NAME,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        return mongoose.connect(DB_URL, options);
    } catch (err) {
        console.error(err);
        process.exit(1);
        return null;
    }
};

module.exports = { connect };
