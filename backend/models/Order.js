const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  items: [
    {
      menuitemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menuitem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
