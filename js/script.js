const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const submitButton = document.getElementById("submit");
const wantedLocation = document.getElementById("location");
const API_KEY = "63666c334cedf876a8067a31186d7ff2";
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");
const currentLocationButton = document.getElementById("current-location");

currentLocationButton.addEventListener("click", function () {
  menu.classList.toggle("menu-active");
  layer1.classList.toggle("layer1-active");
  layer2.classList.toggle("layer3-active");
  layer3.classList.toggle("layer2-active");
  wantedLocation.value = "";
  getWeatherData();
});

menuButton.addEventListener("click", () => {
  layer1.classList.toggle("layer1-active");
  layer2.classList.toggle("layer3-active");
  layer3.classList.toggle("layer2-active");
  menu.classList.toggle("menu-active");
});

const days = [
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Sunday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm"></span>${ampm}</div>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

function getAnyLocationData() {
  submitButton.addEventListener("click", function () {
    menu.classList.toggle("menu-active");
    layer1.classList.toggle("layer1-active");
    layer2.classList.toggle("layer3-active");
    layer3.classList.toggle("layer2-active");
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        wantedLocation.value +
        "&appid=63666c334cedf876a8067a31186d7ff2"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showAnyLocationData(data);
      });
  });
}
getAnyLocationData();

function showAnyLocationData(data) {
  let { feels_like, humidity, pressure, dew_point } = data.main;
  let { sunrise, sunset } = data.sys;
  let { speed } = data.wind;

  let { lat, lon } = data.coord;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutly&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showWeatherData(data);
    });

  timezone.innerHTML = data.sys.country + " / " + data.name;
  countryEl.innerHTML =
    data.coord.lat + " &#176;N " + data.coord.lon + " &#176;E";

  currentWeatherItemsEl.innerHTML = `
  <p id="details">Details</p>
    <div class="weather-item" id="humidity">
    <img src="images/humidity.svg" alt="">
    <p>Humidity</p>
    <p>${humidity}%</p>
  </div>
  <div class="weather-item" id="pressure">
  <img src="images/pressure.svg" alt="">
    <p>Pressure</p>
    <p>${pressure} HpA</p>
  </div>
  <div class="weather-item" id="wind-speed">
  <img src="images/wind-speed.svg" alt="">
    <p>Wind Speed</p>
    <p>${speed} MpH</p>
  </div>
  <div class="weather-item" id="dew-point">
  <img src="images/dew-point.svg" alt="">
  <p>Dew point</p>
  <p>${Math.floor(dew_point)} &#176;C</p>
  </div>
  <div class="weather-item" id="feels-like">
  <img src="images/feels-like.svg" alt="">
  <p>Feels like</p>
  <p>${Math.floor(feels_like - 273.15)} &#176;C</p>
  </div>
  <div class="weather-item" id="sunrise">
  <div><img src="images/sunrise.svg" alt=""></div>
  <div><p>Sunrise</p>
  <p class="sun-time sun-time-first">${window
    .moment(sunrise * 1000)
    .format("HH:mm")}</p></div>
  </div>
    <div class="weather-item" id="sunset">
    <div><img src="images/sunset.svg" alt=""></div>
    <div><p>Sunset</p>
    <p class="sun-time sun-time-second">${window
      .moment(sunset * 1000)
      .format("HH:mm")}</p></div>
    </div>
  `;

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx === 0) {
      currentTempEl.innerHTML = `
      <div class="day" id="today-day">Today</div>
      <img src="http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@4x.png"  id="today-w-icon"  class="w-icon" />
      <div class="temp today-temp today-temp-first" >${Math.floor(
        data.main.temp_max - 273.15
      )} &#176;C</div>
      <div class="temp today-temp today-temp-second" >${Math.floor(
        data.main.temp_min - 273.15
      )} &#176;C</div>
      `;
    } else {
      otherDayForecast += `
      <div class="weather-forecast-item"> 
          <div class="day" >${day}</div>
          <img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" class="w-icon" />
          <div class="temp">Day - ${Math.floor(
            data.main.temp_max - 273.15
          )}&#176; C</div>
          <div class="temp">Night - ${Math.floor(
            data.main.temp_min - 273.15
          )}&#176; C</div>
    </div>
      `;
    }
  });
}

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutly&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}
getWeatherData();

function showWeatherData(data) {
  let {
    feels_like,
    humidity,
    pressure,
    sunrise,
    sunset,
    wind_speed,
    dew_point,
  } = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + " &#176;N " + data.lon + " &#176;E";

  currentWeatherItemsEl.innerHTML = `
  <p id="details">Details</p>
    <div class="weather-item" id="humidity">
    <img src="images/humidity.svg" alt="">
    <p>Humidity</p>
    <p>${humidity}%</p>
  </div>
  <div class="weather-item" id="pressure">
  <img src="images/pressure.svg" alt="">
    <p>Pressure</p>
    <p>${pressure} HpA</p>
  </div>
  <div class="weather-item" id="wind-speed">
  <img src="images/wind-speed.svg" alt="">
    <p>Wind Speed</p>
    <p>${wind_speed} MpH</p>
  </div>
  <div class="weather-item" id="dew-point">
  <img src="images/dew-point.svg" alt="">
  <p>Dew point</p>
  <p>${Math.floor(dew_point)} &#176;C</p>
  </div>
  <div class="weather-item" id="feels-like">
  <img src="images/feels-like.svg" alt="">
  <p>Feels like</p>
  <p>${feels_like} &#176;C</p>
  </div>
  <div class="weather-item" id="sunrise">
  <div><img src="images/sunrise.svg" alt=""></div>
  <div><p>Sunrise</p>
  <p class="sun-time sun-time-first">${window
    .moment(sunrise * 1000)
    .format("HH:mm")}</p></div>
  </div>
    <div class="weather-item" id="sunset">
    <div><img src="images/sunset.svg" alt=""></div>
    <div><p>Sunset</p>
    <p class="sun-time sun-time-second">${window
      .moment(sunset * 1000)
      .format("HH:mm")}</p></div>
    </div>
  `;

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx === 0) {
      currentTempEl.innerHTML = `
      <div class="day" id="today-day">Today</div>
      <img src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }@4x.png"  id="today-w-icon"  class="w-icon" />
      <div class="temp today-temp today-temp-first" >${Math.floor(
        day.temp.day
      )} &#176;C</div>
      <div class="temp today-temp today-temp-second" >${Math.floor(
        day.temp.night
      )} &#176;C</div>
      `;
    } else {
      otherDayForecast += `
      <div class="weather-forecast-item"> 
          <div class="day" >${window.moment(day.dt * 1000).format("ddd")}</div>
          <img src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@4x.png" class="w-icon" />
          <div class="temp" id="temp-with-separator">${Math.floor(
            day.temp.day
          )}&#176; C</div>
          <div class="temp">${Math.floor(day.temp.night)}&#176; C</div>
    </div>
      `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}
