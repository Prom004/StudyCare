const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Notification = sequelize.define("Notification", {
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    type: { 
        type: DataTypes.ENUM("TASK_DUE", "TASK_OVERDUE", "COURSE_REMINDER", "SYSTEM", "ACHIEVEMENT"), 
        defaultValue: "SYSTEM" 
    },
    is_read: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    priority: { 
        type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH", "URGENT"), 
        defaultValue: "MEDIUM" 
    },
    action_url: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    scheduled_for: { 
        type: DataTypes.DATE, 
        allowNull: true 
    }
}, { timestamps: true });

Notification.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Notification, { foreignKey: "user_id" });

module.exports = Notification;
