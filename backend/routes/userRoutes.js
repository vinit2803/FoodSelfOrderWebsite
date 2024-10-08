const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { userAuth, adminAuth } = require("../middleware/userAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validation schema for user
const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "kitchen").optional(),
});

// Validation schema for login
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Register a new user
router.post("/register", async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      username,
      email,
      password,
      role: role || "kitchen", // Default role is 'customer'
    });

    // // Hash password before saving
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login (User/Admin Login)
router.post("/login", async (req, res) => {
  // Validate request body
  const { error } = loginValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Verify password using the comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload (ID and role)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Return the token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (Admin only)
router.get("/alluser", adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a user by ID (Admin only)
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user's profile (Authenticated users) or admins only
router.put("/:id", userAuth, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure the user can only update their own profile or an admin can update any user
    if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only update your own profile.",
        });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
