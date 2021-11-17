// Setting so not empty on Load
var clockElement = document.getElementById('clock');
clockElement.textContent = new Date().toLocaleTimeString().toString();
// Refresh Function
function clock() {
    clockElement.textContent = new Date().toLocaleTimeString().toString();
}
// Refreshing Clock
setInterval(clock, 1000);