//user schema
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
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
    //minlength: 7,// This line is to be discussed on how to handle the attributes
    trim: true,
  },
  role: {
    type: String,
    enum: ["Standard User", "Organizer", "System Admin"],
    default: "Standard User",
  },
}, {
  timestamps: true,
});

UserSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'organizer',
});

const User = mongoose.model("User", UserSchema);

module.exports = User;