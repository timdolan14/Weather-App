// Establish Vars

var searchBtn = document.querySelector('.btn')
var searchInput = document.querySelector('search-bar')
var cityForecast = document.querySelector('.city-forecast')
var fiveDay = document.querySelector('.five-forecast')

var APIkey = "72de6b11fa4df733f08169c8a7643196"

// Fetch Request

var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${"San Diego"}&appid=${APIkey}&units=imperial`
fetch(fiveDayForecast)
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

var currentDay = `https://api.openweathermap.org/data/2.5/forecast?q=${"San Diego"}&appid=${APIkey}&units=imperial`
fetch(currentDay)
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