const mongoose = require("mongoose");
const validator = require("validator");

// Base User Schema
const options = { discriminatorKey: 'role', timestamps: true };

const BaseUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
}, options);

// Base User Model
const User = mongoose.model("User", BaseUserSchema);

// Standard User Schema
const StandardUserSchema = new mongoose.Schema({
  // Add any fields specific to Standard User here
});

// Organizer Schema
const OrganizerSchema = new mongoose.Schema({
  // Add any fields specific to Organizer here
});

// Virtual field for Organizer's events
OrganizerSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "organizer",
});

// System Admin Schema
const SystemAdminSchema = new mongoose.Schema({
  // Add any fields specific to System Admin here
});

// Discriminators
const StandardUser = User.discriminator("Standard User", StandardUserSchema);
const Organizer = User.discriminator("Organizer", OrganizerSchema);
const SystemAdmin = User.discriminator("System Admin", SystemAdminSchema);

module.exports = { User, StandardUser, Organizer, SystemAdmin };