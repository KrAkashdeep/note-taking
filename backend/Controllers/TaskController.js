const TaskModel = require("../Models/TaskModel");

const addTask = async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.id };
    const newTask = new TaskModel(data);
    await newTask.save();
    res.status(201).json({ message: "Task added successfully", success: true });
  } catch (e) {
    res.status(500).json({ message: "failed to add task", success: false });
  }
};

const getTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ user: req.user.id });
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", success: true, tasks });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch tasks", success: false });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

module.exports = { addTask, getTask, deleteTask };
