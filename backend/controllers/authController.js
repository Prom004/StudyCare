const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password_hash, name });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err?.message || "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err?.message || "Server error" });
    }
};

const me = async (req, res) => {
    res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
};

module.exports = { register, login, me };
