// Intializing Modules
const bankHolidays = require('../functions/bankHolidays');
const logging = require('../functions/logger');

// Intializing Server
var express = require('express'),
    router = express.Router();

    // Defining Routes
    router.get('/', function(req, res){
        // Logging Access
        logging.get(req, "/");
        
        // Getting Date
        var date = new Date();
        var hour = date.getHours();
        var Rdate = date.toLocaleDateString('en-GB');
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
    })

    router.get("/about", function(req, res) {
        // Logging Access
        logging.get(req, "/about");
    
        res.render('pages/about');
    });

    router.get("/holidays", async function(req, res) {
        // Logging Access
        logging.get(req, "/holidays");
        // Getting Bank Holidays
        var holidays = await bankHolidays.bankHols();
    
        res.render('pages/holidays', {
            holidays: holidays    
        });
    });
  
  module.exports = router;
