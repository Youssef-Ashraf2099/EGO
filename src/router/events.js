const express = require("express");
const router = express.Router();
const Event = require("../model/Event");

router.get("/test", (req, res) => {
  res.send("testing event route");
});
