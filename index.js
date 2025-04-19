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

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/api/v1", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookings", bookingRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
