
const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  subs: [
    {
      type: String,
    },
  ],

});

module.exports = mongoose.model("Sub", subSchema);