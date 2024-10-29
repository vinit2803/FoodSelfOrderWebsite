const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Order = require("../models/Order");
const Menuitem = require("../models/MenuItem");
const Customer = require("../models/Customer");
const { customerAuth, tokenAuth } = require("../middleware/customerAuth.js");
const kitchenAuth = require("../middleware/kitchenAuth.js");

// Joi validation schema for creating an order
const orderSchema = Joi.object({
  customerId: Joi.string().required(),
  tableNumber: Joi.number().required(),
  items: Joi.array()
    .items(
      Joi.object({
        menuitemId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  totalPrice: Joi.number().optional(),
  Status: Joi.string().valid("pending", "completed", "canceled").optional(),
});

// Create an order (Customer only)
router.post("/create", customerAuth, async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { customerId, tableNumber, items } = req.body;

  try {
    // Verify customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const menuitem = await Menuitem.findById(item.menuitemId);
      if (!menuitem) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuitemId}` });
      }
      totalPrice += menuitem.price * item.quantity;
    }

    const newOrder = new Order({
      customerId,
      tableNumber,
      items,
      totalPrice,
      Status: "pending", // default status
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (Admin or kitchen)
router.get("/getallorders", kitchenAuth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get order by customer
router.get("/orderhistory", customerAuth, tokenAuth, async (req, res) => {
  try {
    const customerId = req.customer._id;

    // find order by customer id
    const orders = await Order.find({ customerId: customerId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this customer" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get order by ID
router.get("/:id", kitchenAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "customerId items.menuitemId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (Kitchen only)
router.put("/:id/status", kitchenAuth, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "completed", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an order (Customer only, for updating items or table number)
router.put("/:id", customerAuth, async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { tableNumber, items } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Calculate new total price
    let totalPrice = 0;
    for (const item of items) {
      const menuitem = await Menuitem.findById(item.menuitemId);
      if (!menuitem) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuitemId}` });
      }
      totalPrice += menuitem.price * item.quantity;
    }

    // Update order details
    order.tableNumber = tableNumber;
    order.items = items;
    order.totalPrice = totalPrice;

    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an order (Admin or kitchen staff only)
router.delete("/:id", kitchenAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
