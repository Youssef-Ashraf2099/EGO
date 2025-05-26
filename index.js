const express = require("express");
const mongoose = require("./src/database/mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./src/router/users");
const eventRouter = require("./src/router/events");
const bookingRouter = require("./src/router/bookings");
//const authernticationMiddleware = require("./src/middleware/authenticationMiddleware");
const path = require("path");

// Load env variables first
require("dotenv").config();

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// API routes
app.use("/api/v1", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookings", bookingRouter);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "src/View/dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/View/dist", "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
