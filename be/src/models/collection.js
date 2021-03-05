const mongoose = require("mongoose");

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
