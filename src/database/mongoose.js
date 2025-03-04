const mongoose = require("mongoose");
// const Admin = require("../models/admin");
// const Organizer = require("../models/organizer");
// const User = require("../models/user");
const booking = require("../models/booking");
const event = require("../models/event");
const dotenv=require("dotenv").config();

//mongoose connection
//const uri = process.env.DATABASE_URL;

async function connect(){
await mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}
connect();
//trial to save in admin model

// const newAdmin = new Admin({
//   name: "Hamza",
//   email: "hamzaa@example.com",
//   profilepic: "path.jpg",
//   password: "1234567",
// });

// save the admin to the db
// newAdmin
//   .save()
//   .then(() => {
//     console.log("Admin saved successfully");
//   })
//   .catch((error) => {
//     console.error("Error saving admin:", error);
//   });

//trial to save in user model
// const newuser = new User({
//   name: "joe",
//   email: "joe@example.com",
//   profilepic: "joe.jpg",
//   password: "1234567",
// });
// save the user to the db
// newuser
//   .save()
//   .then(() => {
//     console.log("User saved successfully");
//   })
//   .catch((error) => {
//     console.log("error" + error);
//   });

//trial to save in Organizer model
// const neworg = new Organizer({
//   name: "zeyad",
//   email: "zeyad@example.com",
//   profilepic: "zeyad.jpg",
//   password: "1234567",
// });
// save the Organizer to the db
// neworg
//   .save()
//   .then(() => {
//     console.log("Organizer saved successfully");
//   })
//   .catch((error) => {
//     console.log("error" + error);
//   });

const newEvent = new event({
  title: "Concert",
  description: "A live music concert featuring various artists.",
  date: new Date("2025-05-20T20:00:00Z"),
  location: "New York",
  category: "Music",
  image: "event-image.jpg",
  ticketPrice: 50,
  ticketAvailable: 100,
});

// Save the event
newEvent.save()
  .then(event => {
    console.log("Event created: ", event);
  })
  .catch(err => {
    console.error("Error creating event: ", err);
  });

  const ticketBookingsArray = [newEvent._id]; // array of event IDs (ObjectId)

// Create a new booking
const newBooking = new booking({
  ticketBookings: ticketBookingsArray, // array of ObjectId(s)
  numOfTickets: 2, // number of tickets booked
  totalPrice: newEvent.ticketPrice * 2, // total price based on ticket price
  status: 'pending', // booking status
});

// Save the booking
newBooking.save()
  .then(booking => {
    console.log("Booking created: ", booking);
  })
  .catch(err => {
    console.error("Error creating booking: ", err);
  });

module.exports = mongoose;
