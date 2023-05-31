const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  notes: {
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
  lastLogIn: {
    type: Date,
    required: false,
  },
  likes: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
