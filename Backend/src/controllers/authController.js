// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const jwtSecret = process.env.JWT_SECRET || 'change_this_secret';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';


async function signup(req, res) {
try {
const { email, password, name } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const existing = await User.findByEmail(email);
if (existing) return res.status(409).json({ message: 'Email already registered' });


const hashed = await bcrypt.hash(password, 10);
const created = await User.create({ email, password: hashed, name });


const token = jwt.sign({ id: created.id, email }, jwtSecret, { expiresIn: jwtExpiresIn });
res.status(201).json({ token, user: { id: created.id, email, name } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
}


async function login(req, res) {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const user = await User.findByEmail(email);
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });
res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
}


module.exports = { signup, login };