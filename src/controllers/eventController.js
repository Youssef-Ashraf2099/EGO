const mongoose = require("mongoose");
const Event = require("../models/event");
const path = require("path");
const fs = require("fs"); // Add fs module for file operations

// Create event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date, // Now this should be a full ISO string from frontend
      time, // you may not need this now, frontend sends combined dateTime
      location,
      category,
      ticketPrice,
      ticketAvailable,
    } = req.body;

    // If date is already combined datetime string, parse it directly
    const dateTime = new Date(date);

    const organizerId = new mongoose.Types.ObjectId(); // replace with real user ID later

    // Save image path relative to server URL
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, "/"); // normalize Windows path separators
    }

    const event = new Event({
      title,
      description,
      date: dateTime,
      location,
      category,
      ticketPrice: parseFloat(ticketPrice),
      ticketAvailable: parseInt(ticketAvailable),
      image: imagePath,
      organizer: organizerId,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error.message);
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
    const updates = { ...req.body };
    
    // Handle the image upload if there is one
    if (req.file) {
      // Save image path relative to server URL
      const imagePath = req.file.path.replace(/\\/g, "/"); // normalize Windows path separators
      updates.image = imagePath;
    }

    // Process date field if provided (combine date and time if needed)
    if (updates.date) {
      try {
        // If time is also provided, combine them
        if (updates.time) {
          const dateTime = new Date(`${updates.date}T${updates.time}`);
          updates.date = dateTime;
        } else {
          // Just use the date directly
          updates.date = new Date(updates.date);
        }
      } catch (dateError) {
        console.error("Error parsing date:", dateError);
        // Keep the original date if parsing fails
      }
    }

    // Convert numeric fields
    if (updates.ticketPrice) {
      updates.ticketPrice = parseFloat(updates.ticketPrice);
    }
    if (updates.ticketAvailable) {
      updates.ticketAvailable = parseInt(updates.ticketAvailable);
    }

    // Remove time field as it's not in the model
    delete updates.time;

    // Update any event without checking ownership (since auth is removed)
    const event = await Event.findByIdAndUpdate(id, updates, { new: true });
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(400).json({ error: error.message });
  }
};

// Event Organizer or Admin: Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // First find the event to get its image path
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete the image file if it exists
    if (event.image) {
      try {
        const imagePath = path.join(process.cwd(), event.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image file: ${imagePath}`);
        }
      } catch (fileError) {
        console.error("Error deleting image file:", fileError);
        // Continue with event deletion even if file deletion fails
      }
    }

    // Now delete the event from the database
    await Event.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
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