//1 data
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
let minute = now.getMinutes();

let dateSelector = document.querySelector("#date");
let weekDaySelector = document.querySelector("#week-day");
let timeSelector = document.querySelector("#time");
let defaultCity = "Kyiv";

dateSelector.innerHTML = `${date}.${month}.${year}`;
weekDaySelector.innerHTML = day;
timeSelector.innerHTML = `${hour}.${minute}`;

function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition(updateWeatherForCurrentLoc);
}
function updateWeatherForCurrentLoc(pos) {
  let apiKey = "b3905c58c42af9ca7d0828ef981abd4b";
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateHtmlWeatherWithCity);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", updateCurrentLocation);

function updateHtmlWeatherWithCity(response) {
  let degrees = document.querySelector("#degree");
  degrees.innerHTML = Math.round(response.data.main.temp);
  console.log(response);

  let hummid = document.querySelector("#hummid");
  hummid.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}

function updateHtmlWeather(response) {
  let degrees = document.querySelector("#degree");
  degrees.innerHTML = Math.round(response.data.main.temp);
  console.log(response);

  let hummid = document.querySelector("#hummid");
  hummid.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
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

//3
function changeToCelsius(event) {
  let degree = document.querySelector("#degree");
  degree.innerHTML = "28";
}
function changeToFarenheit(event) {
  let degree = document.querySelector("#degree");
  degree.innerHTML = "82";
}
let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheit");
celsius.addEventListener("click", changeToCelsius);
farenheit.addEventListener("click", changeToFarenheit);

//week5 - api
