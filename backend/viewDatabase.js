const sequelize = require("./config/database");
const User = require("./models/User");
const Course = require("./models/Course");
const Task = require("./models/Task");
const Notification = require("./models/Notification");

async function viewDatabase() {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log("✅ Database connection successful!");

        // Get table info
        const [results] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("\n📋 Available tables:", results.map(r => r.name));

        // View Users
        console.log("\n👥 USERS:");
        const users = await User.findAll({ raw: true });
        if (users.length > 0) {
            users.forEach(user => {
                console.log(`- ${user.name} (${user.email}) - Created: ${user.createdAt}`);
            });
        } else {
            console.log("No users found");
        }

        // View Courses
        console.log("\n📚 COURSES:");
        const courses = await Course.findAll({ 
            include: [{ model: User, attributes: ['name'] }],
            raw: true 
        });
        if (courses.length > 0) {
            courses.forEach(course => {
                console.log(`- ${course.name} (${course.code}) - Due: ${course.deadline} - User: ${course['User.name']}`);
            });
        } else {
            console.log("No courses found");
        }

        // View Tasks
        console.log("\n✅ TASKS:");
        const tasks = await Task.findAll({ 
            include: [
                { model: User, attributes: ['name'] },
                { model: Course, attributes: ['name'] }
            ],
            raw: true 
        });
        if (tasks.length > 0) {
            tasks.forEach(task => {
                console.log(`- ${task.title} - Due: ${task.due_date} - Priority: ${task.priority} - Completed: ${task.completed} - Course: ${task['Course.name']} - User: ${task['User.name']}`);
            });
        } else {
            console.log("No tasks found");
        }

        // View Notifications
        console.log("\n🔔 NOTIFICATIONS:");
        const notifications = await Notification.findAll({ 
            include: [{ model: User, attributes: ['name'] }],
            raw: true 
        });
        if (notifications.length > 0) {
            notifications.forEach(notification => {
                console.log(`- ${notification.title}: ${notification.message} - Type: ${notification.type} - Priority: ${notification.priority} - Read: ${notification.is_read} - User: ${notification['User.name']}`);
            });
        } else {
            console.log("No notifications found");
        }

    } catch (error) {
        console.error("❌ Error viewing database:", error);
    } finally {
        await sequelize.close();
    }
}

viewDatabase();
