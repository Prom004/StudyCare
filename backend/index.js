require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const taskRoutes = require("./routes/tasks");
const cron = require("node-cron");
const Task = require("./models/Task");
const User = require("./models/User");
const sendReminderEmail = require("./utils/email");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tasks", taskRoutes);

// Sync database (auto-migrate in dev)
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");

    // Email Scheduler
    cron.schedule("0 8 * * *", async () => {
        console.log("Running daily task reminders...");
        try {
            const tasks = await Task.findAll({ 
                where: { completed: false }, 
                include: User 
            });

            const now = new Date();
            tasks.forEach(task => {
                const taskDue = new Date(task.due_date);
                const diffHours = (taskDue - now) / (1000 * 60 * 60);
                if (diffHours <= 24 && diffHours > 0) {
                    sendReminderEmail(task.User.email, { ...task.dataValues });
                }
            });
        } catch (err) {
            console.log(err);
        }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
