const Event = require("../models/event");

// Event Organizer: Create a new event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      category,
      ticketPrice,
      ticketAvailable,
    } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      ticketPrice,
      ticketAvailable,
      organizer: req.user.userId,
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
    const events = await Event.find({ status: "approved" }).populate(
      "organizer"
    );
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

// Event Organizer or Admin: Edit an event
const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if the user is an admin
    if (req.user.role === "System Admin") {
      // Allow admin to update any field, including status
      const event = await Event.findByIdAndUpdate(id, updates, { new: true });
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.status(200).json(event);
    }

    delete updates.status; // Prevent organizers from changing the status field

    // For organizers, restrict updates to their own events
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.user.userId }, // Ensure the organizer owns the event
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

    // Build the filter object dynamically
    const filter = { _id: id };
    if (req.user.role === "Organizer") {
      filter.organizer = req.user.userId; // Add organizer filter only for organizers
    }

    const event = await Event.findOneAndDelete(filter);
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
    const events = await Event.find({ organizer: req.user.userId });
    const analytics = events.map((event) => ({
      title: event.title,
      percentageBooked:
        (
          (event.ticketSold / (event.ticketSold + event.ticketAvailable)) *
          100
        ).toFixed(2) + "%",
    }));
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Organizer: Get all events created by the authenticated organizer(for user router)
const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.userId }).populate(
      "organizer"
    );
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getApprovedEvents,
  getAllEvents,
  getEventById,
  editEvent,
  deleteEvent,
  getEventAnalytics,
  getOrganizerEvents,
};