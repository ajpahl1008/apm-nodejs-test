var apm = require('elastic-apm').start({
    appName: 'test-node-app',
    secretToken: '',
    serverUrl: 'http://192.168.0.214:8200'
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
    apm.startTransaction("HelloWorld", "HTTP");

    sleep(getRandomSleepTime(1, 5000))
 
    var responseCode = getRandomResponseCode();
    console.log("ResponseCode: " + responseCode);
    res.status(responseCode).send('Hello World!')
    apm.endTransaction()
    //res.send('Hello World!')

})

app.listen(3000)
