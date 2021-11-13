// Intiliazing Modules
const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
const request = require('request');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Set the View Engine
app.set('view engine', 'ejs');

// Set the Favicon
app.use(favicon(path.join(__dirname,'images','favicon','favicon.ico')));

// Define Routes
app.get("/", function(req, res) {
    // Saving IP
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    // Logging Access
    console.log(`GET REQUEST FROM: ${ip} on /`);

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
    // Saving IP
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    // Logging Access
    console.log(`GET REQUEST FROM: ${ip} on /about`);

    res.render('pages/about');
});

// Getting bank Holidays
var date = new Date();
const holidays = [];
request('https://www.gov.uk/bank-holidays.json', function (error, response, body) {
    var data = JSON.parse(body);
    for(var number in data["england-and-wales"]["events"]){
        var check = Date.parse(data["england-and-wales"]["events"][number]["date"]);
        if(check > date){
            holidays.push(data["england-and-wales"]["events"][number]);
        }
    }
});

app.get("/holidays", function(req, res) {
    // Saving IP
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    // Logging Access
    console.log(`GET REQUEST FROM: ${ip} on /holidays`);

    res.render('pages/holidays', {
        holidays: holidays    
    });
});

// Activation
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});