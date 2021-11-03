// Intiliazing Modules
const express = require('express');
const path = require('path');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Define Routes
app.get("/", (req, res) => {
    res.status(200).send("VINCE: The Website");
});

// Activation
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});