// Modules

// Functions
// Logging Get Function
function get(req, page) {
    // Saving IP
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    // Getting time
    var time = new Date().toLocaleTimeString();
    // Logging Access
    console.log(`GET Request From: ${ip} on ${page} at ${time}`);
}

// Logging Post Function
function post(req, page) {
    // Saving IP
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    // Getting time
    var time = new Date().toLocaleTimeString();
    // Logging Access
    console.log(`POST Request From: ${ip} on ${page} at ${time}`);
}

// Exporting Functions
module.exports = { get, post };