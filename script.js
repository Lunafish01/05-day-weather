
var apiKey = "dbaf245631a513f4397117d9b90295b3";
var locationInfo = document.querySelector(".location-info");
var searchButton = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var weatherCardsEl = document.querySelector(".weather-cards");

console.log(searchButton);
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

function getCurrentWeather(location) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    return fetch(requestUrl)
        .then(function(response) {
            console.log(response)
            return response.json();
        });
}

function getFiveDayWeather(location) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=8&units=imperial&appid=${apiKey}`;
    return fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.list;
        });
}

function displayCurrentWeather(data) {
    currentWeatherEl.querySelector("h2").textContent = data.name;
    currentWeatherEl.querySelector("h2").style.fontSize = "30px"
    currentWeatherEl.querySelector("h4:nth-child(2)").textContent = "Temperature: " + data.main.temp + "°F";
    currentWeatherEl.querySelector("h4:nth-child(2)").style.fontSize = "30px"
    currentWeatherEl.querySelector("h4:nth-child(3)").textContent = "Wind: " + data.wind.speed + " MPH";
    currentWeatherEl.querySelector("h4:nth-child(3)").style.fontSize = "30px"
    currentWeatherEl.querySelector("h4:nth-child(4)").textContent = "Humidity: " + data.main.humidity + "%";
    currentWeatherEl.querySelector("h4:nth-child(4)").style.fontSize = "30px"

}

var forecastData = [];
var ul = document.querySelector('ul'); 

for (var i = 0; i < forecastData.length; i++) {
    var forecast = forecastData[i];
    
    var card = document.createElement('li');
    card.classList.add('card');
    
    var cardContent = `
        ${forecast.dt_txt}
        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="weather icons" />
        Temperature: ${forecast.main.temp}°F
        Wind: ${forecast.wind.speed} MPH
        Humidity: ${forecast.main.humidity}% 
    `;
    
    card.innerHTML = cardContent;
    ul.appendChild(card);
}
