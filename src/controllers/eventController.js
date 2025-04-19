const Event = require("../models/event");

// Event Organizer: Create a new event
const createEvent = async (req, res) => {
    try {
      const { title, description, date, location, category, ticketPrice, ticketAvailable } = req.body;
      const event = new Event({
        title,
        description,
        date,
        location,
        category,
        ticketPrice,
        ticketAvailable,
        organizer: req.user._id,
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Public: Get approved events
const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({status:"approved"}).populate("organizer");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// System Admin: Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("organizer");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getApprovedEvents,
    getAllEvents,
};