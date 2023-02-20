/// Update Date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let minutes = now.getMinutes();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayTime = document.querySelector("h2");
dayTime.innerHTML = `${day} | ${month} ${date} | ${hours}:${minutes}`;

/// Update City Name and Weather
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "e2fa04aed9dc0b053548ec9053fe82f3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");

/// Current Location Button
function searchLocation(position) {
  let apiKey = "e2fa04aed9dc0b053548ec9053fe82f3";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

/// Celsius to Farenheit

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

/// Farenheit to Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let celsiusTemperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 50;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
