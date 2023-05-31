const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    id: String,
    required: false,
  },
  number: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  home: {
    type: Boolean,
    required: false,
  },
  lender: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastModified: {
    type: Date,
    required: false,
  },
  dateLoan: {
    type: Date,
    required: false,
  },
  dateReturn: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);
