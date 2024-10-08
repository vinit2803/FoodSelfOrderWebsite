const jwt = require("jsonwebtoken");
const User = require("../models/User");

const kitchenAuth = async (req, res, next) => {
  // Get token from the request header
  const token = req.header("Authorization")?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Check if the user's role is "kitchen"
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "kitchen") {
      return res.status(403).json({ message: "Access denied, not a kitchen staff" });
    }

    // Pass the request to the next middleware
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid",err });
  }
};

module.exports = kitchenAuth;
