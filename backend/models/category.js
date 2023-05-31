const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model("Category", categoriesSchema);
