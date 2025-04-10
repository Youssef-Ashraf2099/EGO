const express = require("express");
const router = express.Router();
const booking = require("../model/Booking");

router.get("/test", (req, res) => {
  res.send("testing booking route");
});
