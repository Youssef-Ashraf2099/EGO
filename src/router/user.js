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
  userController.forgetPassword(req, res);
});

// get all users as admin only
// Update the route to use the middleware from controller
router.get("/users", auth, userController.adminAuth, async (req, res) => {
  userController.getAllUsers(req, res);
});
//get user profile and put user profile
router.get("/users/profile", async (req, res) => {
  //user should be authenticated to access this route @ziyadzakzouk
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.put("/users/profile", async (req, res) => {
  //user should be authenticated to access this route @ziyadzakzouk
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("not found");
    }
    Object.assign(user, req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
//get user by id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update
router.patch("/users/:id", async (req, res) => {
  // put wla patch ?
  try {
    const update = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    Object.assign(user, update);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
//delete
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).json({ message: "deleted" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/bookings", async (req, res) => {
  //user 3ady
  //Admin access
  try {
    const user = await User.findById(req.user._id).populate("bookings");
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).send(user.bookings);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/events", async (req, res) => {
  //orgnizer
  //Admin access
  try {
    const user = await User.findById(req.user._id).populate("events");
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).send(user.events);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/events/analtyics", async (req, res) => {
  //orgnizer
  //Admin access
  try {
    const user = await User.findById(req.user._id).populate("events");
    if (!user) {
      return res.status(404).send("not found");
    }
    const events = user.events;
    const analytics = events.map((event) => {
      return {
        eventName: event.name,
        totalBookings: event.bookings.length,
        totalAttendees: event.attendees.length,
      };
    });
    res.status(200).send(analytics);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
