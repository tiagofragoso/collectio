const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    "name": String,
    "items": [{ "label": String, "url": String }],
}, {
    timestamps: true,
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
