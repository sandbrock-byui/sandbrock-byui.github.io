// Calculate the OpenWeather URL to use
const calculateCurrentWeatherURL = () => {
  return `https://api.openweathermap.org/data/2.5/weather?id=3530103&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial`;
};

// Get the current weather report and display it
const loadCurrentWeatherReport = () => {
  let weatherURL = calculateCurrentWeatherURL();

  fetch(weatherURL)
    .then(response => response.json())
    .then(weather => {
      // Extract values
      let description = weather.weather[0].main;
      let temperature = weather.main.temp;
      let humidity = weather.main.humidity;
      let windspeed = weather.wind.speed;

      // Assign summary
      document.getElementById("weather-description").textContent = description;
      document.getElementById("weather-temperature").textContent = Math.round(temperature) + "℉";
      document.getElementById("weather-humidity").textContent = humidity + "%";
      document.getElementById("weather-wind").textContent = Math.round(windspeed) + "mph";
    })
    .catch(error => {
      console.error("An error occurred fetching weather: " + error);
    });
};

loadCurrentWeatherReport();