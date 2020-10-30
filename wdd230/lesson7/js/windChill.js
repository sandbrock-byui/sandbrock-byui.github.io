
let hightempElement = document.getElementById("summary-high-temperature");
let windspeedElement = document.getElementById("summary-wind-speed");
let windchillElement = document.getElementById("summary-wind-chill");

let hightemp = parseInt(hightempElement.textContent);
let windspeed = parseInt(windspeedElement.textContent);
let windchill = "N/A";

if (hightemp <= 50 && windspeed >= 3) {
  windchill = 35.75 + 0.6215 * hightemp - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * hightemp * Math.pow(windspeed, 0.16);
  windchillElement.textContent = Math.round(windchill) + "℉";
}
