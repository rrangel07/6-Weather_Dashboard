# 6-Weather Dashboard
## Links
1. Repository: https://github.com/rrangel07/6-Weather_Dashboard
2. Implementation: https://rrangel07.github.io/6-Weather_Dashboard/

## Description

By using JavaScript, HTML, CSS and server side APIs I was able to create a weather webpage that shows to the user the current Weather, Temperature, Humidity, Wind Speed and UV Index of the city that they were looking for. Also, the user is presented with cards letting them now how the next 5 days are going to be in terms of weather, max & min temperatures, etc.

![First Screen of the App](./assets/images/First%20Page.PNG)

The UV Index is presented with a colored background so the user can easily visualize if it's safe to go out without sunscreen.

![App Showing Results](./assets/images/Showing%20Results.PNG)

The app keeps in local memory previous searches and displays them as button, in case the user wants to go back to any previous city they only have to click the button.

![Reloaded Page Showing Previous Searches as Buttons](./assets/images/Reloaded%20Page%20Showing%20Previous%20Searches%20as%20Buttons.PNG)

All of this is done fetching two APIs, the first gets the Latitude and Longitude (location) of the city required by the user. This data is passed to the second API (weather) to get the weather.

## Instructions

The use of the app is pretty straight forward

You need to introduce the data following this commands:

1. If it is a US city:
    'City, State, Country', i.e.: Atlanta, GA, US
2. It it is a city outside the US:
    'City, Country', i.e.: Berlin, Germany