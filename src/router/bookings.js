const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Apply authentication and authorization middleware to all routes below
router.use(authenticationMiddleware);
router.use(authorizationMiddleware(["Standard User"]));

// POST /api/v1/bookings - Book tickets for an event
router.post("/", BookingController.bookTickets);

// GET /api/v1/bookings/:id - Get booking details by ID
router.get("/:id", BookingController.getBookingById);

// DELETE /api/v1/bookings/:id - Cancel a booking
router.delete("/:id", BookingController.cancelBooking);

module.exports = router;