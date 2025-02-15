const {
  getTask,
  addTask,
  deleteTask,
} = require("../Controllers/TaskController");
const { protect } = require("../Middleware/authMiddleware");

const router = require("express").Router();

// Protect all routes
router.use(protect);

router.get("/", getTask);
router.post("/", addTask);
router.delete("/:id", deleteTask);

module.exports = router;
