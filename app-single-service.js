var apm = require('elastic-apm-node').start({
    serviceName: 'app-single-service',
    secretToken: '',
    serverUrl: 'http://localhost:8200'
})

var app = require('express')()

function simulateException() {
   try {
       adddlert("Welcome");
   }
    catch (err) {
        apm.captureError('Exception Occured  happened!')
    }
}

var responseCodeArray = [ 100, 500, 400, 300, 200 ];

function getRandomResponseCode() {
    return responseCodeArray[Math.floor(Math.random() * 4) + 1];
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function getRandomSleepTime(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// any errors caught by Express can be logged by the agent as well
app.use(apm.middleware.express())

app.get('/', function (req, res) {
    apm.startTransaction("KeepAlive", "HTTP");

    var randomSleepTime = getRandomSleepTime(1,5000);
    sleep(randomSleepTime);
 
    var responseCode = getRandomResponseCode();
    console.log("KeepAlive: ResponseCode: " + responseCode + " Synth Delay Time: " + randomSleepTime );
    res.status(responseCode).send('Service Available\n')
    apm.endTransaction()

})

app.listen(3000)

console.log("app-single-service.js started and listening...")
