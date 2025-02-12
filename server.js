const express = require("express");
const app = express();
const PORT = 3000;

// /ping route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's provided port

// /ping route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
