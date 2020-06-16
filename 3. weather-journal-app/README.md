# Weather-Journal App Project

## Overview

This project is for the Udacity Front End Nanodegree Program

## How to start

Install Node.js in your system
Clone the project to a local directory
Navigate to the directory
Run command "npm install"
Run command "node server.js"

## Description

The app has only one page with 2 sections
The Left section acceps 2 inputs and a button

-   Zip Code (Only 5 digits)
-   Feelings
-   Submit

The Right section shows all your previous entries

## Rest API's

There are 2 API's defined

-   "/addRecord" - Takes in 'date', 'temp', 'feelings' and returns 'true' if the add succeded
-   "/getRecords" - returns all records in a json format
