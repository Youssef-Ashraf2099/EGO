const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const EventController = require("../controllers/eventController");
router.get("/test", (req, res) => {
  res.send("testing event route");
});
//public route
//get all events
router.get("/events", async (req, res) => {
  EventController.getAllEvents(req, res);
});
//get event by id
router.get("/events/:id", async (req, res) => {
  EventController.getEventById(req, res);
});

//protected routes by admin and organizer
//except create event by orgnizer bas
router.post("/events", async (req, res) => {
  EventController.createEvent(req, res);
});

//update event by id
router.patch("/events/:id", async (req, res) => {
  EventController.editEvent(req, res);
});

//delete event by id
router.delete("/events/:id", async (req, res) => {
  EventController.deleteEvent(req, res);
});
