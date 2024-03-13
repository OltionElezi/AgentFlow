const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  image: {
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

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
