// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/database');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const roastRoutes = require('./routes/roastRoutes');
const comebackRoutes = require('./routes/comebackRoutes');
const apologyRoutes = require('./routes/apologyRoutes');
const entityRoutes = require('./routes/entityRoutes');
const authRoutes = require('./routes/authRoutes'); // Make sure authRoutes is imported

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true, // Enables sending cookies from client
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser for handling cookies

// Connect to MySQL
connectDB();

// Health check and root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the RoastMe Bot API!' });
});

// Ping route for health check
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// Auth Route for checking login status (optional for frontend check)
app.get('/api/auth/check-status', (req, res) => {
  if (req.cookies.username) {
    res.status(200).json({
      loggedIn: true,
      user: {
        username: req.cookies.username,
        // Add other user details as needed
      },
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Routes
app.use('/api/auth', authRoutes); // Add auth routes for login/logout
app.use('/api/users', userRoutes);
app.use('/api/roasts', roastRoutes);
app.use('/api/comebacks', comebackRoutes);
app.use('/api/apologies', apologyRoutes);
app.use('/api/entities', entityRoutes);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
