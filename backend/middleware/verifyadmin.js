const jwt = require("jsonwebtoken");

// Middleware to verify the user is authenticated and is an admin
const adminAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting a Bearer token
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach the decoded token to the request

    // Check if the user role is 'admin'
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // Proceed to the next middleware/route
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = adminAuth;
