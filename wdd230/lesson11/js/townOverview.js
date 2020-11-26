// Find an entry in the town array
const findEntryForTown = (towns, townName) => {
  let town = towns.find((town) => town.name === townName); 
  return town;
}

// Create an element that can be nested in the HTML
const createTownElement = (towns, townName) => {
  let townData = findEntryForTown(towns, townName);
  if (!townData) return;

  let townEl = document.createElement("div");

  let townTextEl = document.createElement("div");
  townTextEl.classList.toggle("town-text")
  townEl.appendChild(townTextEl);

  let townTitleEl = document.createElement("h2");
  townTitleEl.textContent = townData.name;
  townTextEl.appendChild(townTitleEl);

  let mottoEl = document.createElement("p");
  mottoEl.textContent = townData.motto;
  mottoEl.classList.toggle("town-motto");
  townTextEl.appendChild(mottoEl);

  let yearFoundedEl = document.createElement("p");
  yearFoundedEl.textContent = `Year Founded: ${townData.yearFounded}`;
  yearFoundedEl.classList.toggle("town-data");
  townTextEl.appendChild(yearFoundedEl);

  let populationEl = document.createElement("p");
  populationEl.textContent = `Population: ${townData.currentPopulation}`;
  populationEl.classList.toggle("town-data");
  townTextEl.appendChild(populationEl);

  let annualRainFallEl = document.createElement("p");
  annualRainFallEl.textContent = `Annual Rain Fall: ${townData.averageRainfall}`;
  annualRainFallEl.classList.toggle("town-data");
  townTextEl.appendChild(annualRainFallEl);

  let townPictureEl = document.createElement("picture");
  townEl.appendChild(townPictureEl);

  let townImageEl = document.createElement("img");
  townImageEl.src = `images/${townData.photo}`;
  townImageEl.alt = townData.name;
  townPictureEl.appendChild(townImageEl);

  return townEl;
}

// Create and add a town element to the HTML
const addTownElement = (towns, townDataRoot, townName) => {
  let townElement = createTownElement(towns, townName);
  if (!townElement) return;
  townDataRoot.appendChild(townElement);
}

// Load an overview of towns
const loadTownOverview = async() => {
  try {
    let response = await fetch("https://byui-cit230.github.io/weather/data/towndata.json");
    let townData = await response.json();
    let towns = townData.towns;
    
    townDataRoot = document.getElementById("town-overview");

    addTownElement(towns, townDataRoot, "Preston");
    addTownElement(towns, townDataRoot, "Soda Springs");
    addTownElement(towns, townDataRoot, "Fish Haven");
  } catch(error) {
    console.error("Error retrieving town data: " + error);
  }
}

loadTownOverview();
