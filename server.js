const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // Use port 5000 or fallback to 3000

// Root route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// /ping route to check if server is running
app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
