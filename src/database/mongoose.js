const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const Event = require("../models/event");
const Booking = require("../models/booking");

// Load environment variables from .env file
dotenv.config();

//mongoose connection
const uri = process.env.DATABASE_URL;
console.log("Connecting to MongoDB:", uri);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample data insertion
    try {
      // Create sample users
      const admin = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: "adminpass",
        role: "System Admin",
      });

      const organizer = new User({
        name: "Organizer User",
        email: "organizer@example.com",
        password: "organizerpass",
        role: "Organizer",
      });

      const standardUser = new User({
        name: "Standard User",
        email: "user@example.com",
        password: "userpass",
        role: "Standard User",
      });

      await admin.save();
      await organizer.save();
      await standardUser.save();

      // Create sample events
      const event1 = new Event({
        title: "Concert",
        description: "A great concert",
        date: new Date(),
        location: "Stadium",
        category: "Music",
        ticketPrice: 50,
        ticketAvailable: 100,
        organizer: organizer._id,
      });

      const event2 = new Event({
        title: "Theater Show",
        description: "A wonderful theater show",
        date: new Date(),
        location: "Theater",
        category: "Drama",
        ticketPrice: 30,
        ticketAvailable: 50,
        organizer: organizer._id,
      });

      await event1.save();
      await event2.save();

      // Create sample bookings
      const booking1 = new Booking({
        user: standardUser._id,
        event: event1._id,
        numberOfTickets: 2,
        totalPrice: 100,
        status: "confirmed",
      });

      const booking2 = new Booking({
        user: standardUser._id,
        event: event2._id,
        numberOfTickets: 1,
        totalPrice: 30,
        status: "confirmed",
      });

      await booking1.save();
      await booking2.save();

      console.log("Sample data inserted successfully");

      // Fetch and print organizer's events
      const organizerWithEvents = await User.findById(organizer._id).populate('events').exec();
      console.log("Organizer's Events:", organizerWithEvents.events);

    } catch (error) {
      console.error("Error inserting sample data:", error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
