// src/models/userModel.js
const pool = require('../config/db');


const User = {
async create({ email, password, name }) {
const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
const [result] = await pool.execute(sql, [email, password, name]);
return { id: result.insertId, email, name };
},


async findByEmail(email) {
const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
const [rows] = await pool.execute(sql, [email]);
return rows[0];
},


async findById(id) {
const sql = 'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1';
const [rows] = await pool.execute(sql, [id]);
return rows[0];
}
};


module.exports = User;