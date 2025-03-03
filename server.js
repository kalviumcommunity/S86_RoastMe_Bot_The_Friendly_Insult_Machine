const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route to check if server is running
app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
