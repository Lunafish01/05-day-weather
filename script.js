
var apiKey = "dbaf245631a513f4397117d9b90295b3";
var locationInfo = document.querySelector(".location-info");
var searchButton = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var weatherCardsEl = document.querySelector(".weather-cards");


searchButton.addEventListener("click", function() {
    var location = locationInfo.value;
    getCurrentWeather(location);
})

function displayCurrentWeather(data) {
    currentWeatherEl.querySelector("h2").textContent = data.locationName;
    currentWeatherEl.querySelector("h4").textContent = "Temperature: " + data.temperature + "°F";
    currentWeatherEl.querySelector(".icon img").src = data.weatherIconUrl;
}

//cerate fetch request to get current location 5 day weather forecast
function getFiveDayWeather(location) {
    var requestUrl = "https://api.example.com/weather?location=" + location;

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function(data) {
        weatherCardEl.textContent = "";
    }
}
//create fetch request to get current location up to date weather
function getCurrentWeather(location) {
    var requestUrl = "https://api.example.com/weather?location=" + location;

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayCurrentWeather(data);
        getFiveDayWeather(location);
        currentWeatherEl.removeAttribute("style");
    })

}
//allow user to search weather data for locations desired
//store location history searched in local storage