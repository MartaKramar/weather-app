let now = new Date();
console.log(now);
let date = now.getDate();
if (date < 10) {
  date = "0" + date;
}
let month = now.getMonth() + 1;
if (month < 10) {
  month = "0" + month;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}
let celsiusTemperature = null;

let dateSelector = document.querySelector("#date");
let weekDaySelector = document.querySelector("#week-day");
let timeSelector = document.querySelector("#time");
let defaultCity = "Kyiv";
let apiKey = "b3905c58c42af9ca7d0828ef981abd4b";

dateSelector.innerHTML = `${date}.${month}.${year}`;
weekDaySelector.innerHTML = day;
timeSelector.innerHTML = `${hour}.${minute}`;

function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}


function displayForecast(response) {
console.log(response);
let forecastFromResponse = response.data.daily;

let forecastRow = document.querySelector("#forecast-row");
let rowResult = "";

forecastFromResponse.forEach(
    function(day, index){
 
      if(index > 0 && index < 7){
  
        let column = `
         <div class="col day">
              <span class="week-day">${formatDay(day.dt)}</span>
              <br />
                <img class="icons" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
              <br />
              <div class="row">
                  <div class="col-6">
                      min.
                  </div>
                  <div class="col-6">
                      max.
                  </div>
              </div>
              <div class="row">
                  <div class="col-6">
                      ${Math.round(day.temp.min)}°C
                  </div>
                  <div class="col-6">
                      ${Math.round(day.temp.max)}°C
                  </div>
              </div>
          </div>
          `;

          rowResult += column;
  }
});
  
forecastRow.innerHTML = rowResult;
  

}
function getForecast(coordinates){
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition(updateWeatherForCurrentLoc);
}
function updateWeatherForCurrentLoc(pos) {
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(updateHtmlWeather);
}


let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", updateCurrentLocation);

function updateHtmlWeather(response) {
  
  getForecast(response.data.coord);

  celsiusTemperature = Math.round(response.data.main.temp);

  let degrees = document.querySelector("#degree");
  degrees.innerHTML = celsiusTemperature;

  let hummid = document.querySelector("#hummid");
  hummid.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector("#description");
  description.innerHTML = (response.data.weather[0].description);
}

function updateWeather(city) {
  let apiKey = "b3905c58c42af9ca7d0828ef981abd4b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateHtmlWeather);
}
updateWeather(defaultCity);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchInput.value;

  updateWeather(searchInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let icon = document.querySelector("#basic-addon3");
icon.addEventListener("click", searchCity);

function changeToCelsius(event) {
  let degree = document.querySelector("#degree");
  degree.innerHTML = celsiusTemperature;
  celsius.classList.add("active");
  farenheit.classList.remove("active");
}
function changeToFarenheit(event) {
  let degree = document.querySelector("#degree");
  degree.innerHTML = Math.round(celsiusTemperature * 9 / 5 + 32);

  celsius.classList.remove("active");
  farenheit.classList.add("active");
}

let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheit");
celsius.addEventListener("click", changeToCelsius);
farenheit.addEventListener("click", changeToFarenheit);