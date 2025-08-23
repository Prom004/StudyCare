const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Course = require("./Course");

const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    due_date: { type: DataTypes.DATE, allowNull: false },
    priority: { type: DataTypes.ENUM("HIGH", "MEDIUM", "LOW"), defaultValue: "MEDIUM" },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

Task.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Task, { foreignKey: "user_id" });

Task.belongsTo(Course, { foreignKey: "course_id" });
Course.hasMany(Task, { foreignKey: "course_id" });

module.exports = Task;
