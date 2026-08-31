# Weather App

A simple weather application built with HTML, CSS, and JavaScript. The application allows users to search for a city and view its current weather information and upcoming hourly forecast.

## Features

* Search for weather by city name
* Displays the searched city
* Displays the current temperature
* Displays the current weather condition
* Displays humidity
* Displays wind speed
* Displays the current date
* Dynamically changes the weather icon based on the weather condition
* Dynamically changes the icon for day and night
* Displays an hourly weather forecast
* Shows a loading message while weather data is being retrieved
* Displays an error message when a city cannot be found
* Search can be performed using the search button or Enter key

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Open-Meteo Geocoding API
* Open-Meteo Weather API

## How It Works

1. The user enters a city name.
2. The application sends the city name to the Open-Meteo Geocoding API.
3. The API returns the latitude and longitude of the city.
4. These coordinates are used to request weather information from the Open-Meteo Weather API.
5. The application receives the current weather and hourly forecast data.
6. JavaScript processes the weather codes and selects the appropriate weather description and icon.
7. The weather information is dynamically displayed on the page.

## Weather Codes

The application uses a JavaScript object to map Open-Meteo weather codes to:

* Weather conditions
* Day icons
* Night icons

This allows the application to display an appropriate icon depending on both the weather condition and whether it is currently day or night.

## Project Structure

```text
Weather-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Running the Project

No installation is required.

1. Download or clone the project.
2. Open `index.html` in a web browser.
3. Enter a city name in the search box.
4. Press **Go** or press **Enter**.
5. The application will retrieve and display the weather.

## APIs

This project uses the Open-Meteo APIs to retrieve location and weather information.

* Geocoding API — converts a city name into latitude and longitude.
* Weather API — retrieves current weather and hourly forecast data.

## Purpose

This project was created as a JavaScript learning project to practice:

* Objects
* Arrays
* `find()`
* Functions
* `for` loops
* DOM manipulation
* Event listeners
* Fetch API
* Promises and `.then()`
* Working with API responses
* Dynamic HTML element creation
* Date formatting
* Conditional statements
* Using external APIs
* CSS layout and styling
