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
// Current Day Forecast

function currentDay(data) {
    let lat = data.city.coord.lat;
    let lon = data.city.coord.lon;
    var currentDayURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
    fetch(currentDayURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            cityForecast.innerHTML = `<div class="city-forecast"><h2>${data.name}</h2> <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/><p>Temp: ${data.main.temp} °F</p><p>Wind: ${data.wind.speed} mph</p><p>Humidity: ${data.main.humidity}%</p></div>`;
            console.log(data);
        });
}

// Five Day Forecast

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
            currentDay(data);
            fiveDay.innerHTML = "";
            for (let i = 0; i < data.list.length; i += 8) {
                var day = data.list[i];
                var date_text = day.dt_txt;
                var dateOnly = date_text.split(" ")[0];
                fiveDay.innerHTML += `<div class="forecast-day"><h3>${dateOnly}</h3> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/><p>Temp: ${day.main.temp} °F</p><p>Wind: ${day.wind.speed} mph</p><p>Humidity: ${day.main.humidity}%</p></div>`
            }
            console.log(data);
        })

}

// Save Buttons to Search History via Local Storage

function saveToLocalStorage() {
    cityList.push(citySearch.value);
    localStorage.setItem("citySearch", cityList);
    var recentButton = document.createElement('button')
    recentButton.textContent = citySearch.value;
    recentButton.addEventListener("click", function (event) {
        console.log("Prev Button Search");
        fiveDayForecast(recentButton.innerHTML);
    })
    previousCities.appendChild(recentButton);
}

// Click to run functions
// Click to run previous searches

searchBtn.addEventListener("click", function (event) {
    fiveDayForecast(citySearch.value);
    saveToLocalStorage();
});