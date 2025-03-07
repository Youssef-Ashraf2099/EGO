const mongoose = require("mongoose");
const validator = require("validator");

const options = { timestamps: true };

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
  ticketSold: {
    type: Number,
    default: 0,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, options);
