const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const EventController = require("../controllers/eventController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Public Routes
// Get list of all approved events
router.get("/", EventController.getApprovedEvents);

// Get list of all events
// api/v1/events/all
router.get(
  "/all",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  EventController.getAllEvents
);

// Get details of a single event by ID
router.get("/:id", EventController.getEventById);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/"); // save files in uploads folder
  },
  filename: function (req, file, cb) {
    // Save file with unique name: timestamp + originalname extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only images (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

// Protected Routes (Event Organizer or Admin)
// Create a new event
router.post(
  "/",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer"]), // Ensure the user is an Event Organizer
  upload.single("image"),
  EventController.createEvent
);

// Update an event by ID
router.put(
  "/:id",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer", "System Admin"]), // Ensure the user is an Organizer or Admin
  upload.single("image"),
  EventController.editEvent
);

// Delete an event by ID
router.delete(
  "/:id",
  authenticationMiddleware, // Ensure the user is authenticated
  authorizationMiddleware(["Organizer", "System Admin"]), // Ensure the user is an Organizer or Admin
  EventController.deleteEvent
);

// Get events created by the authenticated organizer
router.get(
  "/organizer/events", 
  authenticationMiddleware,
  authorizationMiddleware(["Organizer"]),
  EventController.getOrganizerEvents
);

module.exports = router;