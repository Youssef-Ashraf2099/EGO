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

router.post("/sendOtp", async (req, res) => {
  try {
    await userController.passwordResetOtp(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/forgetPassword - Update user password
router.put("/forgetPassword", async (req, res) => {
  try {
    await userController.resetpassword(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
