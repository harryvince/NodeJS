// Intiliazing Modules
const express = require('express');
const path = require('path');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Set the View Engine
app.set('view engine', 'ejs');

// Define Routes
app.get("/", function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2021},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No Programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

app.get("/about", function(req, res) {
    res.render('pages/about');
});

// Activation
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});