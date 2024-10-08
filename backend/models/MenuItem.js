const mongoose = require("mongoose");

const menuitemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  image: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt timestamps
});

const Menuitem = mongoose.model("Menuitem", menuitemSchema);
module.exports = Menuitem;
