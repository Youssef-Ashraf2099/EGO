const express = require("express");
const router = express.Router();
const Event = require("../model/Event");

router.get("/test", (req, res) => {
  res.send("testing event route");
});
//public route
//get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().populate("organizer");
    res.status(200).send(events);
  } catch (e) {
    res.status(500).send(e);
  }
});
//get event by id
router.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer");
    if (!event) {
      return res.status(404).send("not found");
    }
    res.status(200).send(event);
  } catch (e) {
    res.status(500).send(e);
  }
});

//protected routes by admin and organizer
//except create event by orgnizer bas
router.post("/events", async (req, res) => {
  //user should be authenticated as orgnizer to access this route @ziyadzakzouk
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update event by id
router.patch("/events/:id", async (req, res) => {
  try {
    const update = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("not found");
    }
    Object.assign(event, update);
    await event.save();
    res.status(200).send(event);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete event by id
router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send("not found");
    }
    res.status(200).send(event);
  } catch (e) {
    res.status(500).send(e);
  }
});
