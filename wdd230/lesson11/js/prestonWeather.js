const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calculate the day of week name
const getDayOfWeek = (dateString) => {
  var date = new Date(dateString);
  return weekday[date.getDay()];
}

// Load the current weather report
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial";
fetch(weatherURL)
  .then(response => response.json())
  .then(weather => {
    // Extract values
    let description = weather.weather[0].main;
    let temperature = weather.main.temp;
    let humidity = weather.main.humidity;
    let windspeed = weather.wind.speed;

    // Assign summary
    document.getElementById("summary-description").textContent = description;
    document.getElementById("summary-temperature").textContent = temperature + "℉";
    document.getElementById("summary-humidity").textContent = humidity + "%";
    document.getElementById("summary-wind-speed").textContent = windspeed + "mph";

    // Calculate the wind chill
    let windchill = "N/A";
    if (temperature <= 50 && windspeed >= 3) {
      windchill = 35.75 + 0.6215 * temperature - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * temperature * Math.pow(windspeed, 0.16);
      windchill = Math.round(windchill) + "℉";
    }
    document.getElementById("summary-wind-chill").textContent = windchill;
  })
  .catch(error => {
    console.error("An error occurred fetching weather for Preston: " + error);
  });

// Load the weather forecast
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial";
fetch(forecastURL)
  .then(response => response.json())
  .then(forecast => {
    let currentChild = 1;
    for(const curForecast of forecast.list) {
      if (!curForecast.dt_txt.includes("18:00:00")) continue;

      // Set the day of the week
      document.querySelector(`.five-day-forecast > article:nth-child(${currentChild}) h4`).textContent = getDayOfWeek(curForecast.dt_txt);
      
      // Set the icon
      let icon = document.querySelector(`.five-day-forecast > article:nth-child(${currentChild}) img`);
      icon.src = "https://openweathermap.org/img/w/" + curForecast.weather[0].icon + '.png';
      icon.alt = curForecast.weather[0].main;
      
      // Set the temperature
      document.querySelector(`.five-day-forecast > article:nth-child(${currentChild}) div`).textContent = curForecast.main.temp + "℉";

      currentChild++;
    }
  })
  .catch(error => {
    console.error("An error occurred fetching forecast for Preston: " + error);
  });