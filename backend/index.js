const connectToMongo = require("./databse");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use("/uploads", express.static("uploads"));

// avaliable routes
app.use("/api/menuitem", require("./routes/menuitemRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));


app.listen(port, () => {
  console.log(`FoodSelfOrder is running on http://localhost:${port}`);
});
