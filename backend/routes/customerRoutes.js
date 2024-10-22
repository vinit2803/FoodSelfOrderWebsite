const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const { customerAuth, tokenAuth } = require("../middleware/customerAuth.js");
const adminAuth = require("../middleware/verifyadmin.js");

// Joi validation schema for customer
const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phonenumber: Joi.number().required(),
});

// Check authentication using API
router.get("/checkauth", (req, res) => {
  const token = req.cookies.token;

  // Check if token is missing
  if (!token) {
    return res.status(200).json({
      isAuthenticated: false,
      message: "Token missing. Please login.",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).json({
        isAuthenticated: false,
        message: "Invalid token. Please login.",
      });
    }

    // If the token is valid, return authenticated status
    return res.status(200).json({
      isAuthenticated: true,
      userId: decoded.id, // Return user ID or any other info if needed
    });
  });
});

// Logout route
router.post("/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Use secure in production
    sameSite: "strict",
  });

  // Optionally send a response confirming the logout
  return res.status(200).json({ message: "Logged out successfully" });
});


// Customer registration route
router.post("/register", async (req, res) => {
  // Validate request body using Joi
  const { error } = customerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, phonenumber } = req.body;

  try {
    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password,
      phonenumber,
    });

    await newCustomer.save();

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: newCustomer._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Customer registered successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Customer login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

    // // Validate request body using Joi
    // const { error } = customerSchema.validate();
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }
  

  try {
    // Check if customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password using the comparePassword method
    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: customer._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all customers (Admin only, using adminAuth middleware)
router.get("/getallcustomer", adminAuth, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Find customer detail using authorization
router.get("/profile", tokenAuth, async (req, res) => {
  try {
    const customer = req.customer; // Retrieved from middleware
    res.status(200).json({
      isAuthenticated: true,
      id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get customer by ID
router.get("/:id", customerAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update customer by ID
router.put("/:id", customerAuth, async (req, res) => {
  // Validate request body using Joi
  const { error } = customerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, phonenumber } = req.body;

  try {
    const customer = await Customer.findById(req.params.id);
    
    
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    //   Ensure customer can update their own profile
    if (
      customer._id.toString() !== req.customer.id &&
      req.customer.role !== "customemr"
    ) {
      return res.status(403).json({
        message: "Access denied. You can only update your own profile.",
      });
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (password) customer.password = password;
    if (phonenumber) customer.phonenumber = phonenumber;

    await customer.save();

    res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete customer by ID
router.delete("/:id", customerAuth, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
