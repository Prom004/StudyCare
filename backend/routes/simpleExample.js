// Simple Example: How to Use the Authorization System
// This file shows you exactly how to protect your routes

const express = require("express");
const router = express.Router();
const { requireRole, requireOwnership } = require("../config/simpleAuth");
const { authMiddleware } = require("../middleware/authMiddleware");

// Step 1: Apply authentication to all routes below
router.use(authMiddleware);

// Step 2: Protect routes based on what you want to allow

// === STUDENT ROUTES (any logged-in user) ===
router.get("/profile", (req, res) => {
    // req.user contains the logged-in user
    res.json({ user: req.user });
});

// === INSTRUCTOR ROUTES (instructors + admins) ===
router.post("/courses", requireRole('instructor'), (req, res) => {
    // Only instructors and admins can create courses
    res.json({ message: "Course created" });
});

router.post("/tasks", requireRole('instructor'), (req, res) => {
    // Only instructors and admins can create tasks
    res.json({ message: "Task created" });
});

// === OWNER-ONLY ROUTES (owner + admins) ===
router.put("/courses/:id", requireOwnership('course'), (req, res) => {
    // req.resource contains the loaded course
    // Ownership already checked by middleware
    const course = req.resource;
    res.json({ message: "Course updated", course });
});

router.delete("/courses/:id", requireOwnership('course'), (req, res) => {
    // Only course owner or admin can delete
    res.json({ message: "Course deleted" });
});

router.put("/tasks/:id", requireOwnership('task'), (req, res) => {
    // Only task owner or admin can update
    res.json({ message: "Task updated" });
});

// === ADMIN-ONLY ROUTES ===
router.get("/users", requireRole('admin'), (req, res) => {
    // Only admins can see all users
    res.json({ message: "All users" });
});

router.put("/users/:id/role", requireRole('admin'), (req, res) => {
    // Only admins can change user roles
    res.json({ message: "User role updated" });
});

// === MIXED PERMISSIONS ===
router.get("/courses", (req, res) => {
    // Anyone can view courses (but you might filter based on role)
    if (req.user.role === 'admin') {
        // Admin sees all courses
        res.json({ message: "All courses (admin view)" });
    } else if (req.user.role === 'instructor') {
        // Instructor sees their own courses
        res.json({ message: "Your courses (instructor view)" });
    } else {
        // Student sees enrolled courses
        res.json({ message: "Enrolled courses (student view)" });
    }
});

module.exports = router;
