const express = require("express");
const mongoose = require("./src/database/mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user");
const eventRouter = require("./src/routes/events");
const bookingRouter = require("./src/routes/booking");
const authernticationMiddleware = require("./src/middleware/authenticationMiddleware");

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

//app.use("/api/v1", ay routerhena);@hamza00234
//app.use("/api/v1/user", userRouter); //public route no authentication required
app.use(authenticationMiddleware); //any route after this line will be protected by the authentication middleware but otherwise it will be public
//app.use("/api/v1/user", userRouter); is protected route requires authentication

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
