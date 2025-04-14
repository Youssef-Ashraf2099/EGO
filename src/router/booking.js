const express = require("express");
const router = express.Router();
const booking = require("../models/booking");
const BookingController = require("../controllers/bookingController");

router.get("/test", (req, res) => {
  res.send("testing booking route");
});
//koloh user 3ady
router.get("bookings", async (req, res) => {
  BookingController.getAllBookings(req, res);
});

router.get("/bookings/:id", async (req, res) => {
  BookingController.getBooking(req, res);
});

router.delete("/bookings/:id", async (req, res) => {
  BookingController.deleteBooking(req, res);
});
