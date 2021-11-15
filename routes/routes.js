// Intializing Modules
const bankHolidays = require('../functions/bankHolidays');
var express = require('express'),
    router = express.Router();

    // Defining Routes
    router.get('/', function(req, res){
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
    })

    router.get("/about", function(req, res) {
        // Saving IP
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
        // Logging Access
        console.log(`GET REQUEST FROM: ${ip} on /about`);
    
        res.render('pages/about');
    });

    router.get("/holidays", async function(req, res) {
        // Saving IP
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
        // Logging Access
        console.log(`GET REQUEST FROM: ${ip} on /holidays`);
        // Getting Bank Holidays
        var holidays = await bankHolidays.bankHols();
    
        res.render('pages/holidays', {
            holidays: holidays    
        });
    });
  
  module.exports = router;