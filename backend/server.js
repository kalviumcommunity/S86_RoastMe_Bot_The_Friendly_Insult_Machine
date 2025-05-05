// server.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');  // Correct path to connectDB
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const roastRoutes = require('./routes/roastRoutes');
const comebackRoutes = require('./routes/comebackRoutes');
const apologyRoutes = require('./routes/apologyRoutes');
const entityRoutes = require('./routes/entityRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MySQL
connectDB();

// Root route - Shows DB connection status
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the RoastMe Bot API!' });
});

// Ping route for health check
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/roasts', roastRoutes);
app.use('/api/comebacks', comebackRoutes);
app.use('/api/apologies', apologyRoutes);
app.use('/api/entities', entityRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
