const Task = require("../models/Task");
const Course = require("../models/Course");
const { Op } = require("sequelize");

// Computes priority based on hours left until due date
// <= 24h → HIGH, <= 72h → MEDIUM, otherwise LOW
const computePriorityFromDueDate = (dueDate) => {
  try {
    const now = new Date();
    const due = new Date(dueDate);
    const hoursLeft = (due - now) / (1000 * 60 * 60);
    if (hoursLeft <= 24) return "HIGH";
    if (hoursLeft <= 72) return "MEDIUM";
    return "LOW";
  } catch (_) {
    return "LOW";
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      include: { model: Course },
      order: [["due_date", "ASC"]], 
    });
    // Optionally adjust priorities dynamically on fetch
    const adjusted = await Promise.all(tasks.map(async (task) => {
      const dynamicPriority = computePriorityFromDueDate(task.due_date);
      if (task.priority !== dynamicPriority) {
        task.priority = dynamicPriority;
        try { await task.save(); } catch (_) {}
      }
      return task;
    }));
    res.json(adjusted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const createTask = async (req, res) => {
  const { title, due_date, course_id } = req.body;
  try {
    const computedPriority = computePriorityFromDueDate(due_date);
    const task = await Task.create({
      title,
      due_date,
      priority: computedPriority,
      course_id,
      user_id: req.user.id,
      completed: false, 
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, due_date, course_id } = req.body;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.due_date = due_date ?? task.due_date;
    // Always recompute priority from current due date
    task.priority = computePriorityFromDueDate(task.due_date);
    task.course_id = course_id ?? task.course_id;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getOverdueTasks = async (req, res) => {
  try {
    const now = new Date();
    const overdueTasks = await Task.findAll({
      where: {
        user_id: req.user.id,
        completed: false,
        due_date: { [Op.lt]: now },
      },
      include: { model: Course },
      order: [["due_date", "ASC"]],
    });
    // Keep overdue priorities as HIGH
    const adjusted = await Promise.all(overdueTasks.map(async (task) => {
      if (task.priority !== "HIGH") {
        task.priority = "HIGH";
        try { await task.save(); } catch (_) {}
      }
      return task;
    }));
    res.json(adjusted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  getOverdueTasks,
};
