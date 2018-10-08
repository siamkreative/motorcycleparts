## About
This is an experiment is built with node.js, express, Bootstrap 4, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and ES6 template literals. This app lists the motorcycle parts that I have added/changed on my Yamaha MT-07, based on https://airtable.com/shrxx5mmDuAAjnc7J.

## Getting started
First you need to create an `.env` file which will contain the following the [Airtable](https://airtable.com/) info:
```
AT_API_KEY=XXXXX
AT_BASE=XXXXX
AT_TABLE=XXXXX
```

Then simply run the following:
```
yarn install && yarn run start:dev
```

The application will be available at [http:/localhost:3001](http://localhost:3001)
