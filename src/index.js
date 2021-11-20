// Intiliazing Modules
const express = require('express');
const path = require('path');
var routes = require('./routes/routes');
require('dotenv').config();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Set the View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/', routes);

// Activation
const dbURI = 'mongodb://127.0.0.1:27017/login-system?directConnection=true';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    }))
    .catch((err) => console.log(err));
