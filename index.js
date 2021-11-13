// Intiliazing Modules
const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Set the View Engine
app.set('view engine', 'ejs');

// Set the Favicon
app.use(favicon(path.join(__dirname,'images','favicon','favicon.ico')));

// Define Routes
app.get("/", function(req, res) {
    var date = new Date();
    var hour = date.getHours();
    var Rdate = date.toLocaleDateString("en-UK");
    var TOD = "";
    if(hour < 12){
        TOD = "Good Morning, ";
    } else {
        TOD = "Good Afternoon, ";
    }

    res.render('pages/index', {
        TOD: TOD,
        date: Rdate
    });
});

app.get("/about", function(req, res) {
    res.render('pages/about');
});

// Activation
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});