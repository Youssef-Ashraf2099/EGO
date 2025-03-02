const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Organizer = require("../models/organizer");
const User = require("../models/user");

//mongoose connection
const uri = process.env.DATABASE_URL;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//trial to save in admin model

const newAdmin = new Admin({
  name: "Hamza",
  email: "hamzaa@example.com",
  profilepic: "path.jpg",
  password: "1234567",
});

// save the admin to the db
newAdmin
  .save()
  .then(() => {
    console.log("Admin saved successfully");
  })
  .catch((error) => {
    console.error("Error saving admin:", error);
  });

//trial to save in user model
const newuser = new User({
  name: "joe",
  email: "joe@example.com",
  profilepic: "joe.jpg",
  password: "1234567",
});
// save the user to the db
newuser
  .save()
  .then(() => {
    console.log("User saved successfully");
  })
  .catch((error) => {
    console.log("error" + error);
  });

//trial to save in Organizer model
const neworg = new Organizer({
  name: "zeyad",
  email: "zeyad@example.com",
  profilepic: "zeyad.jpg",
  password: "1234567",
});
// save the Organizer to the db
neworg
  .save()
  .then(() => {
    console.log("Organizer saved successfully");
  })
  .catch((error) => {
    console.log("error" + error);
  });

module.exports = mongoose;
