const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calculate the OpenWeather URL to use
const calculateWeatherForecastURL = city => {
  if (city.id)
    return `https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
  else if (city.latitude && city.longitude)
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&long=${city.longitude}&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
};

// Calculate the day of week name
const getDayOfWeek = (dateString) => {
  var date = new Date(dateString);
  return weekday[date.getDay()];
}

// Get the current weather forecast and display it
const loadWeatherForecast = () => {
  weatherSummary = document.getElementById("weather-forecast");
  let city = {
    "id": weatherSummary.dataset.cityId,
    "name": weatherSummary.dataset.cityName,
    "latitude": weatherSummary.dataset.cityLatitude,
    "longitude": weatherSummary.dataset.cityLongitude
  };
  let forecastURL = calculateWeatherForecastURL(city);

  fetch(forecastURL)
    .then(response => response.json())
    .then(forecast => {
      let currentChild = 1;
      for (const curForecast of forecast.list) {
        if (!curForecast.dt_txt.includes("18:00:00")) continue;

        // Set the day of the week
        document.querySelector(`.five-day-forecast > div > article:nth-child(${currentChild}) h4`).textContent = getDayOfWeek(curForecast.dt_txt);

        // Set the icon
        let icon = document.querySelector(`.five-day-forecast > div > article:nth-child(${currentChild}) img`);
        icon.src = "https://openweathermap.org/img/w/" + curForecast.weather[0].icon + '.png';
        icon.alt = curForecast.weather[0].main;

        // Set the temperature
        document.querySelector(`.five-day-forecast > div > article:nth-child(${currentChild}) div`).textContent = curForecast.main.temp + "℉";

        currentChild++;
      }
    })
    .catch(error => {
      console.error("An error occurred fetching forecast for Preston: " + error);
    });
}

loadWeatherForecast();
