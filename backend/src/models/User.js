const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    min: 6,
    max: 32,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 10,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
