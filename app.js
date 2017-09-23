// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'test-node-app',

  // Use if APM Server requires a token
  secretToken: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://192.168.0.214:8200',
})

var app = require('express')()


app.get('/', function (req, res) {
var transaction = apm.startTransaction("HelloWorld", "HTTP")
   try {
    adddlert("Welcome");
   }
    catch(err) {
      apm.captureError('Exception Occured  happened!')
  }
  sleep(getRandomSleepTime(1,5000))
  apm.endTransaction()
  res.status(getRandomResponseCode()).send('Hello World!')
})

function getRandomResponseCode() {
  min = Math.ceil(500);
  max = Math.floor(200);
  return Math.floor(Math.random() * (500 - 200 + 1) % 100) +200; 
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getRandomSleepTime (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// any errors caught by Express can be logged by the agent as well
app.use(apm.middleware.express())

app.listen(3000)
