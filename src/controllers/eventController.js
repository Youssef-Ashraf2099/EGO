const mongoose = require("mongoose");
const Event = require("../models/event");
const path = require("path");
const fs = require("fs");

// Create event
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
      organizer,
    } = req.body;

    // Parse the date
    const dateTime = new Date(date);
    console.log(organizer, "Organizer ID from request body");
    // Use the organizer ID from request
    const organizerId = new mongoose.Types.ObjectId(organizer);

    // Save image path as uploads/filename instead of full path
    let imagePath = "";
    if (req.file) {
      // Extract just the filename from the full path
      const filename = path.basename(req.file.path);
      // Store as "uploads/filename" to match express.static middleware
      imagePath = `uploads/${filename}`;
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
      // Extract just the filename from the full path
      const filename = path.basename(req.file.path);
      // Store as "uploads/filename" to match express.static middleware
      updates.image = `uploads/${filename}`;
    }

    // Process date field if provided
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

    // Update the event
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
        // For images stored as uploads/filename, prepend src/ to get physical location
        const imagePath = path.join(process.cwd(), 'src', event.image);
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

// Organizer: Get all events created by the authenticated organizer
const getOrganizerEvents = async (req, res) => {
  try {
    // Get the userId from the correct path in the decoded token
    const userId = req.user.user?.userId || req.user.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID not found in token" });
    }

    // Do not filter by status, return all events for this organizer
    const events = await Event.find({ organizer: userId }).populate("organizer");
    console.log(events.length, " events found for organizer:", userId);
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this organizer" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getOrganizerEvents:", error);
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