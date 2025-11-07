// src/server.js
const app = require('./app');
const pool = require('./config/db');


const PORT = process.env.PORT || 3000;


async function start() {
// Test DB connection
try {
const conn = await pool.getConnection();
console.log('Connected to MySQL');
conn.release();
} catch (err) {
console.error('Unable to connect to MySQL. Check your .env and MySQL server.');
console.error(err.message);
process.exit(1);
}


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}


start();