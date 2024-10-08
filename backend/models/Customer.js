const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash password before saving
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password validity
customerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
