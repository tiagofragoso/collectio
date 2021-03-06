const mongoose = require("mongoose");

const URL_REGEX = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);

const collectionSchema = new mongoose.Schema({
    "name": {
        type: String,
        minLength: 1,
        maxLength: 75,
        required: true,
    },
    "items": {
        type: [{
            "label": {
                type: String,
                minLength: 1,
                maxLength: 50,
                required: true,
            },
            "url": {
                type: String,
                required: true,
                validate: {
                    validator: (url) => url.match(URL_REGEX),
                },
            },
        }],
        required: true,
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length > 0 && arr.length < 10,
            message: () => "items array must have between 1 and 9 items (inclusive)",
        },
    },
}, {
    timestamps: true,
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
