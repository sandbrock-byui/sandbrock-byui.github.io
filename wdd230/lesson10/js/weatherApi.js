const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=e8edfc62b36c5a326c0f2cd3914c0789&units=imperial";
fetch(apiURL)
	.then(response => response.json())
	.then(jsObject => {
		console.log(jsObject);

		document.getElementById("current-temp").textContent = jsObject.main.temp;

		const imagesrc = "https://openweathermap.org/img/w/" + jsObject.weather[0].icon + '.png';
		const desc = jsObject.weather[0].description;
		document.getElementById("imagesrc").textContent = imagesrc;
		document.getElementById("icon").setAttribute("src", imagesrc);
		document.getElementById("icon").setAttribute("alt", desc);
	});

