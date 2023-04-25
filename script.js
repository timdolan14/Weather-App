// Establish Vars

var searchBtn = document.querySelector('.btn')
var searchInput = document.querySelector('search-bar').value
var wGrid = document.querySelector('.city-forecast')
var fiveDay = document.querySelector('.five-forecast')

var APIkey = "72de6b11fa4df733f08169c8a7643196"

// Fetch Request

var cityAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + APIkey
fetch (cityAPI) 
    .then (function (response) {
        console.log(response);
        return response.json ();
        }).then (function (data) {
            console.log(data);
        })