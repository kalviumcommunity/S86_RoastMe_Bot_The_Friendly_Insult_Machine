const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's provided port

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// /ping route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
