const Event = require("../models/event");

// Public: Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" }).populate("organizer");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("organizer");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Organizer: Create a new event
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
      organizer: req.user._id, // Assuming req.user contains the authenticated organizer
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Organizer: Edit an event
const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.user._id }, // Ensure the organizer owns the event
      updates,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Organizer: Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndDelete({ _id: id, organizer: req.user._id });
    if (!event) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  editEvent,
  deleteEvent
};