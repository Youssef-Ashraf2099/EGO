const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const bookingController = require("../controllers/bookingController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Public routes
// POST /api/v1/register - Register a new user
router.post("/register", async (req, res) => {
  try {
    await userController.register(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/v1/login - Authenticate user and return token
router.post("/login", async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/forgetPassword - Update user password
router.put("/forgetPassword", async (req, res) => {
  try {
    await userController.forgotPassword(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-only routes
// GET /api/v1/users - Get a list of all users
router.get(
  "/users",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  async (req, res) => {
    try {
      await userController.getAllUsers(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Protected routes (Authenticated Users)
// GET /api/v1/users/profile - Get current user’s profile
router.get(
  "/users/profile",
  authenticationMiddleware,
  async (req, res) => {
    try {
      await userController.getCurrentUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// PUT /api/v1/users/profile - Update current user’s profile
router.put(
  "/users/profile",
  authenticationMiddleware,
  async (req, res) => {
    try {
      await userController.updateUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route skipped at the end

// PUT /api/v1/users/:id - Update user’s role
router.put(
  "/users/:id",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  async (req, res) => {
    try {
      await userController.updateRole(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE /api/v1/users/:id - Delete a user
router.delete(
  "/users/:id",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  async (req, res) => {
    try {
      await userController.deleteUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Standard User routes
// GET /api/v1/users/bookings - Get current user’s bookings
router.get(
  "/users/bookings",
  authenticationMiddleware,
  authorizationMiddleware(["Standard User"]),
  async (req, res) => {
    try {
      await bookingController.getUserBookings(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Event Organizer routes
// GET /api/v1/users/events - Get current user’s events
router.get(
  "/users/events",
  authenticationMiddleware,
  authorizationMiddleware(["Organizer"]),
  async (req, res) => {
    try {
      await eventController.getOrganizerEvents(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/v1/users/events/analytics - Get the analytics of the current user’s events
router.get(
  "/users/events/analytics",
  authenticationMiddleware,
  authorizationMiddleware(["Organizer"]),
  async (req, res) => {
    try {
      await eventController.getEventAnalytics(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/v1/users/:id - Get details of a single user
router.get(
  "/users/:id",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  async (req, res) => {
    try {
      await userController.getUser(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;