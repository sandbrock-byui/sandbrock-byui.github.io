const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calculate the OpenWeather URL to use
const calculateWeatherForecastURL = () => {
  return `https://api.openweathermap.org/data/2.5/forecast?id=3530103&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
};

// Calculate the day of week name
const getDayOfWeek = (dateString) => {
  var date = new Date(dateString);
  return weekday[date.getDay()];
}

// Get the current weather forecast and display it
const loadWeatherForecast = () => {
  //weatherSummary = document.getElementById("weather-forecast");
  let forecastURL = calculateWeatherForecastURL();

  fetch(forecastURL)
    .then(response => response.json())
    .then(forecast => {
      let currentChild = 1;

      for (const curForecast of forecast.list) {
        if (!curForecast.dt_txt.includes("18:00:00")) continue;
        if (currentChild > 3) continue;

        // Set the day of the week
        document.querySelector(`.weather-forecast > div > article:nth-child(${currentChild}) > header > p`).textContent = getDayOfWeek(curForecast.dt_txt);

        // Set the icon
        let icon = document.querySelector(`.weather-forecast > div > article:nth-child(${currentChild}) img`);
        icon.src = "https://openweathermap.org/img/w/" + curForecast.weather[0].icon + '.png';
        icon.alt = curForecast.weather[0].main;

        // Set the temperature
        document.querySelector(`.weather-forecast > div > article:nth-child(${currentChild}) > p`).textContent = Math.round(curForecast.main.temp) + "℉";

        currentChild++;
      }
    })
    .catch(error => {
      console.error("An error occurred fetching forecast: " + error);
    });
}

loadWeatherForecast();
