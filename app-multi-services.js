var apm = require('elastic-apm').start({
    appName: 'app-multi-service',
    secretToken: '',
    serverUrl: 'http://localhost:8200'
})

var app = require('express')()

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

app.get('/reviewCart', function (req, res) {
    apm.startTransaction("ReviewCart", "HTTP");
    var randomSleepTime = getRandomSleepTime(1,5000);
    sleep(randomSleepTime);
    var responseCode = getRandomResponseCode();
    console.log("ReviewCart: ResponseCode: " + responseCode + " Synth Delay Time: " + randomSleepTime );
    res.status(responseCode).send('You have no items.  Go pick stuff!!!\n')
    apm.endTransaction()
})

app.get('/submitOrder', function (req, res) {
    apm.startTransaction("SubmitOrder", "HTTP");
    var randomSleepTime = getRandomSleepTime(1,5000);
    sleep(randomSleepTime);
    var responseCode = getRandomResponseCode();
    console.log("SubmitOrder: ResponseCode: " + responseCode + " Synth Delay Time: " + randomSleepTime );
    res.status(responseCode).send('Order is on the way!\n')
    apm.endTransaction()
})

app.get('/login', function (req, res) {
    apm.startTransaction("Login", "HTTP");
    var randomSleepTime = getRandomSleepTime(1,2000);
    sleep(randomSleepTime);
    var responseCode = getRandomResponseCode();
    console.log("Login: ResponseCode: " + responseCode + " Synth Delay Time: " + randomSleepTime );
    res.status(responseCode).send('Welcome to Awesome!!!\n')
    apm.endTransaction()
})

app.get('/badStuff', function (req, res) {
    apm.startTransaction("Login", "HTTP");
    try {
      adddlert("ThisMethodWillNotWork");
    }
    catch(err) {
      apm.captureError('Fake but sort of real Exception Occured!')
    }
    res.status(200).send('Well that was not good...\n')
    
    apm.endTransaction()
})

app.listen(3000)

console.log("app-multi-service.js started and listening...")
