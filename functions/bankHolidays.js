// Intializing Modules
const request = require('request');

// Functions
// Getting bank Holidays
async function getBankHols() {
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
    await sleep(1000);
    return holidays;
}

// Sleep Function
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

// Exports
module.exports = { getBankHols };