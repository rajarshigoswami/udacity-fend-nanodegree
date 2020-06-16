# FEND CAPSTONE PROJECT

# Overview

Project that uses various asynchronous API's to fetch data to show a possible trip information to the user. Following API's are used

-   Geoname - For getting Latitude and longitude of the location
-   Weatherbit - For getting Weather Information
-   Pixabay - For getting a photo of the location

## Extend the project

-   Countdown Timer
-   Disabling past trips

## Run the application

Checkout the application to a local directory
execute `npm install` in the checked out directory
update the '.env' file in the root directory

### Dev Mode

To start the project in dev mode run the below command and it will start the application on port 8080

`$ npm run build-dev`

To run the server application execute the below command
`$ npm run start`

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

## Offline

The project uses service workers to achieve offline functionality

## Testing

Testing is done via jest. To run it , run the command
`$ npm run test`

## Pages

The application has only one page i.e. the homepage

It has 3 Input fields - Location ,Start Date, End Date

If any of the field are empty , and the "Get Trip Info " button is clicked, an error is shown
If the api call fails , an error is shown
If the API Call suceeds, the details are shown below on the page
