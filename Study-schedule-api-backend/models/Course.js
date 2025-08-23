const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Course = sequelize.define("Course", {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    deadline: { type: DataTypes.DATE },
}, { timestamps: true });

Course.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Course, { foreignKey: "user_id" });

module.exports = Course;
