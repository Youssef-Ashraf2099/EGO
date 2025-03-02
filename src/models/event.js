const mongoose = require("mongoose");
const validator = require("validator");

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  ticketAvailable: {
    type: Number,
    required: true,
  },
});