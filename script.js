// Establish Vars

var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-bar');
var cityForecast = document.querySelector('.city-forecast')
var fiveDay = document.querySelector('.five-forecast')
var searchValue = searchInput.value;
var citySearch = document.querySelector('.city-search')
var APIkey = "72de6b11fa4df733f08169c8a7643196"

// Fetch Requests

function fiveDayForecast() {
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${APIkey}&units=imperial`;
    // var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=${APIkey}&units=imperial`;
    fetch(fiveDayForecastURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < data.list.length; i += 8) {
                var day = data.list[i]
                fiveDay.innerHTML += `<div class="forecast-day"><h3>${day.dt_txt}</h3> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/><p>Temp:${day.main.temp}</p><p>Wind:${day.wind.speed}</p><p>Humidity:${day.main.humidity}</p></div>`
            }
        })

    console.log("clicked")
}

function currentDay() {
    var currentDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${APIkey}&units=imperial`;
    // var currentDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=${APIkey}&units=imperial`
    fetch(currentDayURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var day = data.list[0]
            cityForecast.innerHTML += `<div class="city-forecast"><h2>${data.city.name} ${day.dt_txt}</h2> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/><p>Temp:${day.main.temp}</p><p>Wind:${day.wind.speed}</p><p>Humidity:${day.main.humidity}</p></div>`
        })
    console.log("clicked2")
}

function renderSearchHistory () {
    citySearch.innerHTML = '';
    
}

searchBtn.addEventListener("submit", function(event) {
    event.preventDefault();
    currentDay();
    fiveDayForecast();
});
