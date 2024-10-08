const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/FoodSelfServeRestaurant";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
  console.log("Connected to mongoDatabase");
};

module.exports = connectToMongo;
