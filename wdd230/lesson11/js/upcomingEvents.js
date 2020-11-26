const eventsURL = "https://byui-cit230.github.io/weather/data/towndata.json";

// Find the entry for a single town within the town array
const findEntryForCity = (cities, cityName) => {
  let town = cities.find((town) => town.name === cityName);
  return town;
}

// Add an event element to the event list
const addEventElement = (upcomingEventsRoot, eventData) => {
  var eventParagraph = document.createElement("p");
  eventParagraph.textContent = eventData;
  upcomingEventsRoot.appendChild(eventParagraph);
}

// Load upcoming events for the current town
const loadUpcomingEvents = async () => {
  try {
    let response = await fetch(eventsURL);
    let allCityData = await response.json();
    let cities = allCityData.towns;

    upcomingEventsRoot = document.getElementById("upcoming-events");
    upcomingEventsWrapper = document.createElement("div");
    upcomingEventsRoot.appendChild(upcomingEventsWrapper);

    let cityName = upcomingEventsRoot.dataset.cityName;
    let cityData = findEntryForCity(cities, cityName);
    cityData.events.forEach(event => addEventElement(upcomingEventsWrapper, event));
  } catch (error) {
    console.error("Error retrieving town data: " + error);
  }
}

loadUpcomingEvents();