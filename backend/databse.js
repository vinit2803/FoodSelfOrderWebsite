const mongoose = require("mongoose");
const fs = require("fs");
const Menuitem = require("./models/MenuItem"); // Adjust the path as necessary

const mongoURI = "mongodb://localhost:27017/FoodSelfServeRestaurant";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to mongoDatabase");
      
      // Read the json file
      fs.readFile("data.json", "utf8", async (err, data) => {
        if (err) {
          console.log("Error reading the file", err);
          return;
        }
        const menuItems = JSON.parse(data);

        // Insert data into database
        for (const item of menuItems) {
          try {
            const existingItem = await Menuitem.findOne({ name: item.name });
            if (!existingItem) {
              const newItem = new Menuitem(item);
              await newItem.save();
              console.log(`Inserted: ${item.name}`);
            }
          } catch (error) {
            console.error("Error inserting item", error);
          }
        }
      });
    });
};

module.exports = connectToMongo;
