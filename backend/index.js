const connectToMongo = require("./databse");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

// Connect to MongoDB
connectToMongo();

const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

// Configure Socket.IO with proper CORS settings
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:4000", "http://localhost:3000"], // Frontend URLs
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies) if needed
  },
  transports: ["websocket", "polling"],
});

const port = 5000;

// Middleware configurations
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"], // Frontend URLs
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies) if needed
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Available routes
app.use("/api/menuitem", require("./routes/menuitemRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

// Socket.IO connection management
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Event when kitchen joins the room
  socket.on("joinKitchen", () => {
    console.log(`Kitchen connected with ID: ${socket.id}`);
    socket.join("kitchen"); // Join the kitchen room
    console.log(`Kitchen room joined: ${socket.id}`);
  });

  // Handle other events like orderPlaced
  socket.on("orderPlaced", (orderData) => {
    console.log("Order placed:", orderData);

    // Emit the order to the kitchen room
    io.to("kitchen").emit("newOrder", orderData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
