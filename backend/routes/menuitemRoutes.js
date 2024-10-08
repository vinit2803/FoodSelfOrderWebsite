const express = require("express");
const router = express.Router();
const Menuitem = require("../models/MenuItem");
const adminAuth = require("../middleware/verifyadmin");
const Joi = require("joi");

// Validation schema for Menuitem
const menuitemValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  image: Joi.string().required(),
  available: Joi.string().valid("Yes", "No").default("Yes"),
  notes: Joi.string().optional(),
});

// Create a new menu item (Admin only)
router.post("/add", adminAuth, async (req, res) => {
  // Validate the input
  const { error } = menuitemValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, price, description, category, image, available, notes } = req.body;

  try {
    const newMenuitem = new Menuitem({
      name,
      price,
      description,
      category,
      image,
      available,
      notes,
    });

    await newMenuitem.save();
    res.status(201).json({ message: "Menu item created successfully", menuitem: newMenuitem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all menu items
router.get("/gellfullmenu", async (req, res) => {
  try {
    const menuitems = await Menuitem.find();
    res.status(200).json(menuitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const menuitem = await Menuitem.findById(req.params.id);
    if (!menuitem) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json(menuitem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a menu item (Admin only)
router.put("/:id", adminAuth, async (req, res) => {
  // Validate the input
  const { error } = menuitemValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const menuitem = await Menuitem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuitem) return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({ message: "Menu item updated successfully", menuitem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a menu item (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const menuitem = await Menuitem.findByIdAndDelete(req.params.id);
    if (!menuitem) return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
