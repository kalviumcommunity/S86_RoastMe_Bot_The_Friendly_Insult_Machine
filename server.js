const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/user');
const Roast = require('./models/roast');
const Comeback = require('./models/comeback');
const Apology = require('./models/apology');
const Reaction = require('./models/reaction');
const Report = require('./models/report');
const Session = require('./models/session');
const BotResponse = require('./models/botResponse');
const Settings = require('./models/settings');
const ChatHistory = require('./models/chatHistory');

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 for Bruno

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process on connection failure
  }
}
connectDB();

// Root route - Shows DB connection status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';
  res.json({ message: 'Welcome to the server!', database: dbStatus });
});

// /ping route
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
