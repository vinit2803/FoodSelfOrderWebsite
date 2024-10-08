const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const customerAuth = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = decoded;

    // check customer role is customer
    const customer = await Customer.findById(req.customer.id);
    if(!customer || customer.role !== 'customer'){
        return res.status(403).json({message:"Access denied, customer only."});
    }

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = customerAuth;
