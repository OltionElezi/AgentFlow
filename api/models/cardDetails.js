// CardModel.js

const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  calendar: {
    type: String,
    required: true,
  },
});

const CardDb = mongoose.model("CardDb", cardSchema);

module.exports = CardDb;
