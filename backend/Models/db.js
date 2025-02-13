const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URL;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
