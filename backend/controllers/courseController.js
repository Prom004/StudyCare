const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { user_id: req.user.id },
      order: [["createdAt", "ASC"]], 
    });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const createCourse = async (req, res) => {
  const { name, code, color, deadline } = req.body;
  try {
    const course = await Course.create({
      name,
      code,
      color: color || "#ffffff", 
      deadline: deadline ? new Date(deadline) : null,
      user_id: req.user.id,
    });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, code, color, deadline } = req.body;
  try {
    const course = await Course.findOne({ where: { id, user_id: req.user.id } });
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.name = name ?? course.name;
    course.code = code ?? course.code;
    course.color = color ?? course.color;
    course.deadline = deadline !== undefined ? (deadline ? new Date(deadline) : null) : course.deadline;
    await course.save();

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne({ where: { id, user_id: req.user.id } });
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
