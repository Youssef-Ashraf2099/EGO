const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { forgotpassword, verify } = require("../email/account");
const secretKey = process.env.SECRET_KEY;

const userController = {
  register: async (req, res) => {
    try {
      // Check if required fields exist
      const { name, email, password, role = "Standard User" } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
          required: ["name", "email", "password"],
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "User already registered",
        });
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        role,
      });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 8);
      user.password = hashedPassword;

      await user.save();

      // Return success without password
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: userResponse,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({
        success: false,
        error: "Server error during registration",
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("email not found");
      }
      console.log(user);

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(405).send("incorect password");
      }

      const currentDateTime = new Date();
      const expiresAt = new Date(+currentDateTime + 1800000);

      // Generate a JWT token
      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        secretKey,
        {
          expiresIn: "1d",
        }
      );

      return res
        .cookie("token", token, {
          expires: expiresAt,
          httpOnly: true,
          secure: true, // Set to true if using HTTPS
          SameSite: "none",
        })
        .status(200)
        .send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).send(e);
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("user not found");
      }
      const password = req.body.password;
      if (password) {
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
          const hashedPassword = await bcrypt.hash(password, 8);
          user.password = hashedPassword;
          return res.status(200).send("updated successfully");
        } else {
          return res.status(400).send("you must use a new password");
        }
      }

      Object.assign(user, req.body);
      await user.save();
      return res.status(200).send("updated successfully");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  updateRole: async (req, res) => {
    try {
      const id = req.params.id;
      const role = req.body.role;
      const user = await User.findByIdAndUpdate(id, { role }, { new: true });
      return res.status(200).send("role updated");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  deleteAllUsers: async (req, res) => {
    try {
      const users = await User.deleteMany({});
      return res.status(200).send("All users have been deleted");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      return res.status(200).send("successfully deleted user");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  getCurrentUser: (req, res) => {
    return res.send(req.user);
  },
  forgotPassword: async (req, res) => {
    try {
      const { email, otp, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User not found");
      }

      await forgotpassword(email);
      const verification = verify(email, otp);

      if (!verification) {
        return res.status(400).send("incorrect otp");
      }

      const newPassword = password;
      const newHashed = await bcrypt.hash(newPassword, 8);
      user.password = newHashed;
      await user.save();
      return res.status(201).send("new password set");
    } catch (e) {
      return res.status(500).send(e);
    }
  },
};

module.exports = userController;
