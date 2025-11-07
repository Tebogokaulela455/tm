// src/controllers/userController.js
const User = require('../models/userModel');


async function getProfile(req, res) {
try {
const id = req.user.id;
const user = await User.findById(id);
if (!user) return res.status(404).json({ message: 'User not found' });
res.json({ user });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
}


module.exports = { getProfile };