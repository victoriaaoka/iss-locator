# [ISS-LOCATOR](http://iss-locator-staging.herokuapp.com/) <br /> [![Build Status](https://travis-ci.org/victoriaaoka/iss-locator.svg?branch=chore-test-routes-%23161437395)](https://travis-ci.org/victoriaaoka/iss-locator)  [![Coverage Status](https://coveralls.io/repos/github/victoriaaoka/iss-locator/badge.svg?branch=chore-test-routes-%23161437395)](https://coveralls.io/github/victoriaaoka/iss-locator?branch=chore-test-routes-%23161437395)
[ISS-Locator](http://iss-locator-staging.herokuapp.com/) is an app that shows the current position of the [International Space Station](https://en.wikipedia.org/wiki/International_Space_Station) on a Google Map. 

The data used by the app is retrieved from [Open Notify](http://open-notify.org/) as well as [Google Maps](https://cloud.google.com/maps-platform/). 

## Prerequisites: 
- Ensure ```node``` is installed - [installation guide](https://nodejs.org/en/download/package-manager/)
- Ensure mongoDB is installed and the mongo daemon is running - [installation guide](https://docs.mongodb.com/manual/installation/): 
    
    For mac users: ``` $ brew install mongodb && mkdir mongo-db && mongod --dbpath mongo-db && mongod ```
- Ensure the ```.env``` file has the necessary data. Refer to the ```env_sample``` file.

## Setup
- Clone the repo by running: 

```
$ git clone https://github.com/victoriaaoka/iss-locator.git
```

- Change directory into the project folder: 

```
$ cd iss-locator
```

- Install dependencies by running the command:

```
$ npm install
``` 

- Start the app by running any of the following commands:

```
$ node app.js
```  
```
$ nodemon
```

- Access the app at: 

```
localhost:<PORT>
``` 

NB: The mongo daemon should be running on one terminal tab, and the app on a different tab.

## Testing
Run the command: 
```
$ npm test
```

## Built with
- Node 
- Express
- Pug & CSS
- Mongodb