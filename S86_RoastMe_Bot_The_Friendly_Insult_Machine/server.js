const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db'); // MongoDB connection

// Import routes
const userRoutes = require('./routes/userRoutes');
const roastRoutes = require('./routes/roastRoutes');
const comebackRoutes = require('./routes/comebackRoutes');
const apologyRoutes = require('./routes/apologyRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root route - Shows DB connection status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';
  res.json({ message: 'Welcome to the RoastMe Bot API!', database: dbStatus });
});

// /ping route
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/roasts', roastRoutes);
app.use('/api/comebacks', comebackRoutes);
app.use('/api/apologies', apologyRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
