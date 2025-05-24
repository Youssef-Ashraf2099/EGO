const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const EventController = require("../controllers/eventController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Get list of all approved events
router.get("/", EventController.getApprovedEvents);

// Get details of a single event by ID
router.get("/:id", EventController.getEventById);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files in uploads folder
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

// Create a new event (with image upload)
// Add authentication and authorization if needed (uncomment the middleware)
router.post(
  "/",
  authenticationMiddleware,
  authorizationMiddleware(["Organizer"]),
  upload.single("image"),
  EventController.createEvent
);

// Update an event by ID
router.put(
  "/:id",
  //authenticationMiddleware,
 // authorizationMiddleware(["Organizer", "System Admin"]),
    upload.single("image"),
  EventController.editEvent
);

// Delete an event by ID
router.delete(
  "/:id",
  //authenticationMiddleware,
 // authorizationMiddleware(["Organizer", "System Admin"]),
  EventController.deleteEvent
);

module.exports = router;