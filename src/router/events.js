const express = require("express");
const router = express.Router();
const EventController = require("../controllers/eventController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Public Routes
// Get list of all approved events
router.get("/", EventController.getApprovedEvents);

// Get list of all events
router.get("/all",authenticationMiddleware,authorizationMiddleware(["System Admin"]), EventController.getAllEvents);

// Get details of a single event by ID
router.get("/:id", EventController.getEventById);

// Protected Routes (Event Organizer or Admin)
// Create a new event
router.post(
  "/",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer"]), // Ensure the user is an Event Organizer
  EventController.createEvent
);

// Update an event by ID
router.put(
  "/:id",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer", "System Admin"]), // Ensure the user is an Organizer or Admin
  EventController.editEvent
);

// Delete an event by ID
router.delete(
  "/:id",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer", "System Admin"]), // Ensure the user is an Organizer or Admin
  EventController.deleteEvent
);

module.exports = router;