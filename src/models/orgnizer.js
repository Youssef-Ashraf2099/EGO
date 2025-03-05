const mongoose = require("mongoose");
const validator = require("validator");

const organizerschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new error("invalid email");
        }
      },
    },
    profilepic: {
      type: String, //url or path to profile picture
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
  },
  {
    timestamps: true,
  }
);

const Organizer = mongoose.model("Organizer", organizerschema);

module.exports = Organizer;
