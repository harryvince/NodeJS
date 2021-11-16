// Intiliazing Modules
const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routes/routes');

// Start Server
const app = express();
const port = process.env.PORT || "8000";

// Set the View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Set the Favicon
app.use(favicon(path.join(__dirname,'images','favicon','favicon.ico')));

// Define Routes
app.use('/', routes);

// Activation
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
