# Evaluate a News Article with Natural Language Processing

# This project is a part of the Udacity Front End Nanodegree Program to understand build tools and single page applications

## What we are building

This project helps us in understanding how to user build tools and single page applications.
We will be using a third party api "Aylien" which can help build a simple web interface to their NLP system.
The tool will give output of whether the article is positive,negative or netral as well as it is subjective or objective. More details can be found in the Aylen site.

Tools used :

-   Node and Express.js for routing as well as webserver.
-   Webpack for building the application
    -   Webpack will have Dev as well as Prod config
-   Just for running our tests

## Run the application

### Dev Mode

To start the project in dev mode run the below command and it will start the application on port 8080

`$ npm run build-dev`

### Prod Mode

To generate the production build.

`$ npm run build-prod`

### To run the server

To run the server application execute the below command

`$ npm run start`

## Config

-   webpack.dev.js - Manages the development webpack config
-   webpack.prod.js - Manages the production webpack config
-   package.json - Node Package manager
-   .env - Handles the API_ID, API_KEY for the Aliyen API

## API

The project uses the Text Analysis SDKs from [aylien](https://aylien.com/text-api/sdks/), for the content analysis

## Offline

The project uses service workers to achieve offline functionality

## Testing

Testing is done via jest. To run it , run the command
`$ npm run test`

## Pages

The application has only one page i.e. the homepage

It has an input element which takes in an url and a submit button which submits the url supplied for text analysis
Invalid URL will show an error message
Failure response from the server will show an error message
