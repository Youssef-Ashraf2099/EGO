const express = require("express");
const router = express.Router();
const booking = require("../model/Booking");

router.get("/test", (req, res) => {
  res.send("testing booking route");
});

router.get("bookings", async (req, res) => {
  try {
    const bookings = await booking.find().populate("event").populate("user");
    res.status(200).send(bookings);
  } catch (e) {
    res.status(500).send(e);
  }
});
