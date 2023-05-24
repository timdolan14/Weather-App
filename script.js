// Establish Vars

var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-bar');
var cityForecast = document.querySelector('.city-forecast')
var fiveDay = document.querySelector('.five-forecast')
var cityList = []
var citySearch = document.querySelector('.city-search')
var previousCities = document.querySelector('.previous-cities')
var APIkey = "72de6b11fa4df733f08169c8a7643196"

// Fetch Requests

function fiveDayForecast(name) {
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${APIkey}&units=imperial`;
    fetch(fiveDayForecastURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            fiveDay.innerHTML = "";
            for (let i = 0; i < data.list.length; i += 8) {
                var day = data.list[i];
                var date_text = day.dt_text;
                var dateOnly = date_text.split(" ")[0];
                fiveDay.innerHTML += `<div class="forecast-day"><h3>${dateOnly}</h3> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/><p>Temp:${day.main.temp}</p><p>Wind:${day.wind.speed}</p><p>Humidity:${day.main.humidity}</p></div>`
            }
            console.log(data);
        })

}

function currentDay(name) {
    var currentDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${APIkey}&units=imperial`;
    fetch(currentDayURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            var day = data.list[0];
            var date_text = day.dt_text;
            var dateOnly = date_text.split(" ")[0];
            cityForecast.innerHTML = `<div class="city-forecast"><h2>${data.city.name} ${dateOnly}</h2> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/><p>Temp:${day.main.temp}</p><p>Wind:${day.wind.speed}</p><p>Humidity:${day.main.humidity}</p></div>`
        })
}

function saveToLocalStorage() {
    cityList.push(citySearch.value);
    localStorage.setItem("citySearch", cityList);
    var recentButton = document.createElement('button')
    recentButton.textContent = citySearch.value;
    recentButton.addEventListener("click", function (event) {
        console.log("Prev Button Search");
        console.log(recentButton.innerHTML);
        currentDay(recentButton.innerHTML);
        fiveDayForecast(recentButton.innerHTML);
    })
    previousCities.appendChild(recentButton);
}

searchBtn.addEventListener("click", function (event) {
    currentDay(citySearch.value);
    fiveDayForecast(citySearch.value);
    saveToLocalStorage();
});