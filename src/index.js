const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://mongodb:27017";
const db_name = "collectio";
const collection_name = "collections";

const client = MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function loadMongo() {
    await client.connect();
    console.log("connected");

    const db = client.db(db_name);
    const collection = db.collection(collection_name);
    const res = await collection.find().toArray();
    console.log(res);
}

loadMongo();

const app = express();

app.get("/", function(req, res) {
    res.send("Hello");
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("Running in port 3000");
});
