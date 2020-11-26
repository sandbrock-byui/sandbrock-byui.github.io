// Calculate the OpenWeather URL to use
const calculateCurrentWeatherURL = city => {
  if (city.id)
    return `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
  else if (city.latitude && city.longitude)
    return `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
};

// Get the current weather report and display it
const loadCurrentWeatherReport = () => {
  weatherSummary = document.getElementById("weather-summary");
  let city = {
    "id": weatherSummary.dataset.cityId,
    "name": weatherSummary.dataset.cityName,
    "latitude": weatherSummary.dataset.cityLatitude,
    "longitude": weatherSummary.dataset.cityLongitude
  };
  let weatherURL = calculateCurrentWeatherURL(city);

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
      document.getElementById("summary-temperature").textContent = Math.round(temperature) + "℉";
      document.getElementById("summary-humidity").textContent = humidity + "%";
      document.getElementById("summary-wind-speed").textContent = Math.round(windspeed) + "mph";

      // Calculate the wind chill
      let windchill = "N/A";
      if (temperature <= 50 && windspeed >= 3) {
        windchill = 35.75 + 0.6215 * temperature - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * temperature * Math.pow(windspeed, 0.16);
        windchill = Math.round(windchill) + "℉";
      }
      document.getElementById("summary-wind-chill").textContent = windchill;
    })
    .catch(error => {
      console.error("An error occurred fetching weather: " + error);
    });
};

loadCurrentWeatherReport();