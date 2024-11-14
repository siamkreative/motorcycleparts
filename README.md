## Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/64a552dd-8501-4157-943f-018a1e9f0e71/deploy-status)](https://app.netlify.com/sites/motorcycleparts/deploys)

- [Demo site](https://motorcycleparts.netlify.app/)

## About
This experiment was built with node.js, express, Parcel, Spectre, the fetch API and ES6 template literals. The data comes from [this Airtable](https://airtable.com/shrxx5mmDuAAjnc7J).

## Getting started
First, head to https://airtable.com/create/tokens to create the API token (`AT_API_KEY`). Then, create an `.env` file which will contain the following Airtable info:
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
