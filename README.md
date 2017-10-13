# apm-nodejs-test
Simple NodeJS app that feeds maddog

# Setup
After you've cloned this repo...
- execute: npm install 

# Single Service Instruction
======================================
- execute: node app-single-service.js
...in a separate terminal...
- execute: curl localhost:3000/
Should get: Service Available

======================================
# Multiple Service Instruction
- execute: node app-multi-service.js

...in a separate terminal...
-execute: curl localhost:3000/login
Should get: Welcome to Awesome!!

-execute: curl localhost:3000/reviewCart
Should get: You have no items.  Go pick stuff!!!

-execute: curl localhost:3000/submitOrder
Should get: Order is on the way!
-execute: curl localhost:3000/badStuff
Should get: Well that was not good...
AND...
In the terminal with the app
logging error <GENERATED UUID> with Elastic APM

