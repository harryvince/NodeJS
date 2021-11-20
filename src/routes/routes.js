// Intializing Modules
const bankHolidays = require('../functions/bankHolidays');
const logging = require('../functions/logger');
const bcrypt = require('bcrypt');
const passport = require('passport');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Login = require('../models/login');

// Connect to mongodb
const dbURI = 'mongodb://127.0.0.1:27017/login-system?directConnection=true';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Intilize passport
const initializePassport = require('../functions/passport-config');
initializePassport(passport);

// Intializing Server
var express = require('express'),
    router = express.Router();
    // Allows user to logout
    router.use(methodOverride('_method'));

    // Defining Routes
    router.get('/', checkAuthenticated, function(req, res){
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
            date: Rdate,
            name: req.user.name
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

    router.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('pages/login.ejs');
    });
    
    router.post('/login', (req, res, next) =>{
        passport.authenticate('local' ,{
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    });
    
    router.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('pages/register.ejs', {
            errors: req.flash("errors")
        });
    });
    
    router.post('/register', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const detail = new Login({
                name: req.body.name,
                email: req.body.email.toLocaleLowerCase(),
                password: hashedPassword
            });
            const query = Login.where({ email: req.body.email.toLocaleLowerCase() });
            query.findOne(async function (err, login) {
                if (err) return handleError(err);
                if (login) {
                    req.flash("errors", "An account is already associated with this email address, Please try again");
                    res.redirect('/register');
                } else {
                    detail.save();
                    res.redirect('/login');
                }
            });
        } catch {
            res.redirect('/register');
        }
    });
    
    router.delete('/logout', (req, res) => {
        req.logOut();
        res.redirect('/login');
    });
    
    function checkAuthenticated(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
    
        res.redirect('/login');
    }
    
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    }
  
  module.exports = router;
