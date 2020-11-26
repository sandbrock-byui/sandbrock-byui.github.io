const eventsURL = "https://byui-cit230.github.io/weather/data/towndata.json";

// Find the entry for a single town within the town array
const findEntryForTown = (towns, townName) => {
  let town = towns.find((town) => town.name === townName);
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
    let allTownData = await response.json();
    let towns = allTownData.towns;

    upcomingEventsRoot = document.getElementById("upcoming-events");
    upcomingEventsWrapper = document.createElement("div");
    upcomingEventsRoot.appendChild(upcomingEventsWrapper);

    let townName = upcomingEventsRoot.dataset.townName;
    let townData = findEntryForTown(towns, townName);
    townData.events.forEach(event => addEventElement(upcomingEventsWrapper, event));
  } catch (error) {
    console.error("Error retrieving town data: " + error);
  }
}

loadUpcomingEvents();