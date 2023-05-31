const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    categories: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("Author", authorSchema);
