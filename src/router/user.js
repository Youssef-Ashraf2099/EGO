const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");
const auth = require("../middleware/authenticationMiddleware");

router.get("/test", (req, res) => {
  res.send("testing");
});

// Public routes
router.post("/register", async (req, res) => {
  userController.register(req, res);
});

router.post("/login", async (req, res) => {
  userController.login(req, res);
});

router.put("/forgetPassword", async (req, res) => {
  userController.forgotPassword(req, res);
});

// get all users as admin only
// Update the route to use the middleware from controller
router.get("/users", async (req, res) => {
  userController.getAllUsers(req, res);
});

//temporary
router.delete("/users", async (req, res) => {
  userController.deleteAllUsers(req, res);
});

//get user profile and put user profile
router.get("/users/profile", async (req, res) => {
  userController.getCurrentUser(req, res);
});
//update user profile
router.put("/users/profile", async (req, res) => {
  userController.updateUser(req, res);
});
//get user by id
router.get("/users/:id", async (req, res) => {
  userController.getUser(req, res);
});

//update
router.put("/users/:id", async (req, res) => {
  userController.updateRole(req, res);
});
//delete
router.delete("/users/:id", async (req, res) => {
  userController.deleteUser(req, res);
});
//user 3ady
//Admin access
router.get("/users/bookings", async (req, res) => {
  userController.getUserBookings(req, res);
});
//orgnizer
//Admin access
router.get("/users/events", async (req, res) => {
  userController.getUserEvents(req, res);
});
//orgnizer
//Admin access
router.get("/users/events/analtyics", async (req, res) => {
  userController.getUserEventsAnalytics(req, res);
});

module.exports = router;
