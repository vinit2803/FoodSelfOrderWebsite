const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure the path is correct

// Middleware to verify the user is authenticated
const userAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting a Bearer token
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Middleware to verify the user is an admin
const adminAuth = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Assuming token is sent as Bearer <token>
  
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      
      
      req.user = decoded; // Attach user info to the request object
  
      // Check if the user role is admin
      const user = await User.findById(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied, admin only." });
      }
      
      next(); // Proceed to the next middleware/route handler
    } catch (err) {
      console.error("Admin auth error:", err);
      return res.status(401).json({ message: "Invalid Token" });
    }
  };

module.exports = { userAuth, adminAuth };
