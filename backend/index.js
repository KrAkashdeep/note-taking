const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db");

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", require("./Routes/AuthRoutes"));
app.use("/tasks", require("./Routes/TaskRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
