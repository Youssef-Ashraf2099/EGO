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

router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await booking
      .findById(req.params.id)
      .populate("event")
      .populate("user");
    if (!booking) {
      return res.status(404).send("not found");
    }
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send("not found");
    }
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send(e);
  }
});
