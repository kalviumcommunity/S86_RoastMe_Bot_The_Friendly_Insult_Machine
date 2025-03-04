const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; // Set to 3000 to match Bruno's default

// Middleware to handle CORS and JSON requests
app.use(cors());
app.use(express.json());

// Root route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// /ping route to check if server is running
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
