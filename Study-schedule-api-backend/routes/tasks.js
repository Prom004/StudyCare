const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getTasks, createTask, updateTask, deleteTask, toggleTask, getOverdueTasks } = require("../controllers/taskController");

router.use(authMiddleware);

router.get("/", getTasks);
router.get("/overdue", getOverdueTasks)
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

module.exports = router;
