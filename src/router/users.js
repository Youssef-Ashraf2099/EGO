const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const bookingController = require("../controllers/bookingController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const uploadMiddlewear=require("../middleware/uploadMiddleware")

const sayHelloMiddleware = (req, res, next) => {
  // Numbered by route path and method
  if (req.path === "/register" && req.method === "POST") {
    console.log("1. Hello from sayHelloMiddleware! (POST /register)");
  } else if (req.path === "/login" && req.method === "POST") {
    console.log("2. Hello from sayHelloMiddleware! (POST /login)");
  } else if (req.path === "/sendOtp" && req.method === "POST") {
    console.log("3. Hello from sayHelloMiddleware! (POST /sendOtp)");
  } else if (req.path === "/forgetPassword" && req.method === "PUT") {
    console.log("4. Hello from sayHelloMiddleware! (PUT /forgetPassword)");
  } else if (req.path === "/users" && req.method === "GET") {
    console.log("5. Hello from sayHelloMiddleware! (GET /users)");
  } else if (req.path === "/users/profile" && req.method === "GET") {
    console.log("6. Hello from sayHelloMiddleware! (GET /users/profile)");
  } else if (req.path === "/users/profile" && req.method === "PUT") {
    console.log("7. Hello from sayHelloMiddleware! (PUT /users/profile)");
  } else if (req.path === "/logout" && req.method === "POST") {
    console.log("8. Hello from sayHelloMiddleware! (POST /logout)");
  } else if (req.path.match(/^\/users\/[^/]+$/) && req.method === "PUT") {
    console.log("9. Hello from sayHelloMiddleware! (PUT /users/:id)");
  } else if (req.path.match(/^\/users\/[^/]+$/) && req.method === "DELETE") {
    console.log("10. Hello from sayHelloMiddleware! (DELETE /users/:id)");
  } else if (req.path === "/users/bookings" && req.method === "GET") {
    console.log("11. Hello from sayHelloMiddleware! (GET /users/bookings)");
  } else if (req.path === "/users/events" && req.method === "GET") {
    console.log("12. Hello from sayHelloMiddleware! (GET /users/events)");
  } else if (req.path === "/users/events/analytics" && req.method === "GET") {
    console.log("13. Hello from sayHelloMiddleware! (GET /users/events/analytics)");
  } else if (req.path.match(/^\/users\/[^/]+$/) && req.method === "GET") {
    console.log("14. Hello from sayHelloMiddleware! (GET /users/:id)");
  } else if (req.path === "/profile-picture" && req.method === "PUT") {
    console.log("15. Hello from sayHelloMiddleware! (PUT /profile-picture)");
  } else {
    console.log("?. Hello from sayHelloMiddleware! (Unknown route)", req.method, req.path);
  }
  next();
};
// Apply globally to all routes in this router
router.use(sayHelloMiddleware);

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
// Admin-only routes
// GET /api/v1/users - Get a list of all users
router.get(
  "/users",
  authenticationMiddleware,
  authorizationMiddleware(["System Admin"]),
  async (req, res) => {
    try {
      console.log("Fetching all users");
      await userController.getAllUsers(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// Protected routes (Authenticated Users)
// GET /api/v1/users/profile - Get current user’s profile
router.get("/users/profile", authenticationMiddleware, async (req, res) => {
  try {
    await userController.getCurrentUser(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/users/profile - Update current user’s profile
router.put("/users/profile", authenticationMiddleware, async (req, res) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//logout
router.post('/logout', authenticationMiddleware, userController.logout);

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
router.put(
  '/profile-picture',authenticationMiddleware,
  uploadMiddlewear.single('profilePicture'), // NOT two middlewares
  userController.profilePicture
);



module.exports = router;
