//declare variable for API key
var apiKey = "dbaf245631a513f4397117d9b90295b3";
//get handle on all elements to be manipulated
var locationInfo = document.querySelector(".location-info");
var searchButton = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var weatherCardsEl = document.querySelector(".weather-cards");


//add event listener to search button for click event
//target search button
searchButton.addEventListener("click", function() {
    var location = locationInfo.value;
    getCurrentWeather(location)
        .then(function(currentWeather) {
            displayCurrentWeather(currentWeather);
            return getFiveDayWeather(location);
        })
        .then(function(forecastData) {
            displayForecast(forecastData);
            currentWeatherEl.removeAttribute("style");
        })
});

//write function to fetch current weather data for searched location
//use weather api url 
function getCurrentWeather(location) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    return fetch(requestUrl)
        .then(function(response) {
            return response.json();
        });
}

//write function to fetch 5 day forecast of searched location 
//insert weather api url
function getFiveDayWeather(location) {
    var requestUrl = `api.openweathermap.org/data/2.5/forecast/daily?zip={78209},{us}&cnt=5&appid={apiKey}`;
    return fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.list;
        });
}

//get current weather data
//set current weather data to the DOM
//weather icons are not updating with weather data
function displayCurrentWeather(data) {
    var weatherData = [
        { selector: "h2", text: "Location: " + data.name },
        { selector: "h4:nth-child(2)", text: "Temperature: " + data.main.temp + "°F" },
        { selector: "h4:nth-child(3)", text: "Wind: " + data.wind.speed + " MPH" },
        { selector: "h4:nth-child(4)", text: "Humidity: " + data.main.humidity + "%" },
    ];

    for (var i = 0; i < weatherData.length; i++) {
        var element = weatherData[i];
        var el = currentWeatherEl.querySelector(element.selector);
        el.textContent = element.text;
        el.style.fontSize = "30px";
    }
}
  
var ul = document.createElement("ul");

//get 5 day forecast data and update html elements
//unable to update 'li' elements with 5 day forecast
//weather icons are not generating from api
function displayForecast(forecastData) {
var cards = document.querySelectorAll(".weather-cards .cards")

    for(var i = 0; i < forecastData.length && i < cards.length; i++) {
        var forecast = forecastData[i];
        var card = cards[i];

        var dateEl = card.querySelector("h3");
        dateEl.textContent = forecast.dt_txt;

        var iconEl = card.querySelector("img");
        iconEl.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        var tempEl = card.querySelectorAll("h4")[0];
        tempEl.textContent = "Temperature: " + forecast.main.temp + "°F";

        var windEl = card.querySelectorAll("h4")[1];
        windEl.textContent = "Wind " + forecast.wind.speed + " Mph";

        var humidityEl = card.querySelectorAll("h4")[2];
        humidityEl.textContent = "Humidity: " + forecast.main.humidity + "%";
    }
}
