const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema({
  addBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedTime: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
