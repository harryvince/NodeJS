// Intializing Modules
const request = require('request');

// Functions

// Getting bank Holidays
function bankHols() {
    return new Promise((resolve) => {
        var date = new Date();
        var holidays = [];
        request('https://www.gov.uk/bank-holidays.json', async function (error, response, body) {
            var data = JSON.parse(body);
            for await(let number of data["england-and-wales"]["events"]){
                var check = Date.parse(number["date"]);
                if(check > date){
                    holidays.push(number);
                    console.log(number);
                }
            }
            resolve(holidays);
        });
    });
}

// Sleep Function
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

// Exports
module.exports = { bankHols };