// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'change_this_secret';


function authMiddleware(req, res, next) {
const header = req.headers.authorization;
if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authorization required' });


const token = header.split(' ')[1];
try {
const payload = jwt.verify(token, jwtSecret);
req.user = payload; // {id, email}
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
}


module.exports = authMiddleware;