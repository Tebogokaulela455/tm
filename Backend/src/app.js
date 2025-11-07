// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');


dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Simple health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// 404
app.use((req,res) => res.status(404).json({ message: 'Not found' }));


module.exports = app;