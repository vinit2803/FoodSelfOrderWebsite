const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Menuitem = require("./models/MenuItem"); // Adjust the path as necessary

const mongoURI = "mongodb://localhost:27017/FoodSelfServeRestaurant";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to mongoDatabase");

      // Use __dirname to construct the absolute path to data.json
      const filePath = path.join(__dirname, "data.json");

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error(`File not found at: ${filePath}`);
        return;
      }

      // Read the json file
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          console.log("Error reading the file", err);
          return;
        }
        const menuItems = JSON.parse(data);

        // Insert data into the database
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
    })
    .catch((error) => {
      console.error("Error connecting to mongoDatabase", error);
    });
};

module.exports = connectToMongo;
