const Event = require("../models/event");

// Public: Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Get event details by ID
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
      organizer: req.user.userId, // Corrected to use req.user.userId
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Event Organizer or Admin: Edit an event
const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.user.userId }, // Corrected to use req.user.userId
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

// Event Organizer or Admin: Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndDelete({ _id: id, organizer: req.user.userId }); // Corrected to use req.user.userId
    if (!event) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Event Organizer: View analytics for their events
const getEventAnalytics = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.userId }); // Corrected to use req.user.userId
    const analytics = events.map((event) => ({
      title: event.title,
      percentageBooked: ((event.ticketSold / (event.ticketSold + event.ticketAvailable)) * 100).toFixed(2) + "%",
    }));
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Approve or reject an event
const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "approved" or "declined"
    if (!["approved", "declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const event = await Event.findByIdAndUpdate(id, { status }, { new: true });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Organizer: Get all events created by the authenticated organizer
const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.userId }).populate("organizer");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  editEvent,
  deleteEvent,
  getEventAnalytics,
  updateEventStatus,
  getOrganizerEvents,
};