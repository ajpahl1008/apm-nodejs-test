
# Requirements
The following packages will make life easy for you if you're on a Mac.
```
brew (get it here: https://brew.sh/)
node (#brew install node)
watch (#brew install watch)
```
The following packages will make life easy for you if you're on a PC.
```
Coming soon...
```

# apm-nodejs-test
Simple NodeJS app that feeds maddog

Clone this repo and setup all the libraries via npm
```
# git clone https://github.com/ajpahl1008/apm-nodejs-test.git
# cd apm-nodejs-test
# npm install
```

# Single Service Instruction
Execute The following to start the single service
```
# node app-single-service.js
# curl localhost:3000/
```

Expected Response: Service Available

======================================
# Multiple Service Instruction
Execute the folowing to start the multiple service javascript
```
# node app-multi-service.js
```

...in a separate terminal...
```
# curl localhost:3000/login
```
Expected Response: Welcome to Awesome!!

```
# curl localhost:3000/reviewCart
```
Expected Response: You have no items.  Go pick stuff!!!

```
# curl localhost:3000/submitOrder
```
Expected Response: Order is on the way!

```
# curl localhost:3000/badStuff
```
Expected Response: Well that was not good...
AND
In the terminal where app-single-service is running...

```
logging error `<Generated UUID>` with Elastic APM
```
