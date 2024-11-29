const connectToMongo = require("./databse");
const express = require("express");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

connectToMongo();

const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4000', // Your front-end origin
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials if needed
  },
});

const port = 5000;

app.use(cors({
  origin: 'http://localhost:4000', // Your front-end origin
  methods: ['GET', 'POST'],
  credentials: true, // Allow credentials if needed
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Serve the 'uploads' folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Available routes
app.use("/api/menuitem", require("./routes/menuitemRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for order placement
  socket.on("orderPlaced", (orderData) => {
    console.log("New order received:", orderData);
    // Broadcast order placement to kitchen
    socket.broadcast.emit("newOrder", orderData);
  });

  // Listen for order status updates from kitchen
  socket.on("updateOrderStatus", (orderData) => {
    console.log("Order status updated:", orderData);
    // Broadcast status update to the customer
    socket.broadcast.emit("orderStatusUpdated", orderData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`FoodSelfOrder is running on http://localhost:${port}`);
});
