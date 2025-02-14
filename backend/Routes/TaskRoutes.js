const {
  getTask,
  addTask,
  deleteTask,
} = require("../Controllers/TaskController");

const router = require("express").Router();
router.get("/", getTask);
router.post("/", addTask);
router.delete("/:id", deleteTask);

module.exports = router;
