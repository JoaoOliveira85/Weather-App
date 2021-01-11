import { getWeatherData } from "./api-requests.js";
import { cityList } from "./dataSet.js";

const createDivs = (place, type, quantity, id, className) => {
	for (let i = 0; i < quantity; i++) {
		const newDiv = document.createElement(`${type}`);

		if (id != "") {
			newDiv.id = id[i];
		}

		if (className != "") {
			newDiv.className = className[i];
		}
		place.appendChild(newDiv);
	}
};

const renderCard = (data, units) => {
	createDivs(
		document.querySelector("#weatherBoard"),
		"div",
		1,
		[`id${data.id}`],
		["cityCard"]
	);

	createDivs(
		document.querySelector(`#id${data.id}`),
		"div",
		4,
		[`close${data.id}`, `head${data.id}`, `body${data.id}`, `footer${data.id}`],
		["closeCard", "cardHeader", "cardBody", "cardFooter"]
	);

	document.querySelector(`#close${data.id}`).innerText = "X";
	document.querySelector(`#close${data.id}`).addEventListener("click", () => {
		cityList.splice(cityList.indexOf(`${data.name.toLowerCase()}`), 1);
		localStorage.setItem("cityList", JSON.stringify(cityList));
		renderCards(cityList, units);
		return;
	});

	createDivs(
		document.querySelector(`#head${data.id}`),
		"div",
		2,
		[`name${data.id}`, `icon${data.id}`],
		["cityName", "weatherIcon"]
	);

	createDivs(
		document.querySelector(`#body${data.id}`),
		"div",
		1,
		[`text${data.id}`],
		["weatherDescription"]
	);

	createDivs(
		document.querySelector(`#footer${data.id}`),
		"div",
		2,
		[`temp${data.id}`, `feels${data.id}`],
		["cityTemp", "cityFeels"]
	);

	document.querySelector(
		`#name${data.id}`
	).innerHTML = `<h1 class="cityText">${data.name}</h1>`;
	document.querySelector(
		`#icon${data.id}`
	).innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
	document.querySelector(
		`#text${data.id}`
	).innerHTML = `<h2>${data.weather[0].description}</h2>`;
	document.querySelector(
		`#temp${data.id}`
	).innerHTML = `<h3 class="tempClass">${
		Math.round(data.main.temp * 10) / 10
	}º${units === "metric" ? "C" : "F"}</h3>`;
	document.querySelector(
		`#feels${data.id}`
	).innerHTML = `<h3 class="feelText">${
		Math.round(data.main.feels_like * 10) / 10
	}º${units === "metric" ? "C" : "F"}</h3>`;
};

const renderCards = (cityList, units) => {
	while (document.querySelector("#weatherBoard").firstChild) {
		document
			.querySelector("#weatherBoard")
			.removeChild(document.querySelector("#weatherBoard").firstChild);
	}
	cityList.forEach((card) => {
		getWeatherData(card, units).then((data) => {
			renderCard(data, units);
		});
	});
};

const renderBackground = () => {
	const background = document.createElement("div");
	background.id = "background";

	const backgroundTop = document.createElement("div");
	const backgroundBottom = document.createElement("div");
	const backgroundMiddle = document.createElement("div");
	backgroundTop.id = "backgroundTop";
	backgroundMiddle.id = "backgroundMiddle";
	backgroundBottom.id = "backgroundBottom";
	// background.style.overflow = "hidden";
	backgroundMiddle.innerHTML = `<svg
	  preserveAspectRatio="none"
	  viewBox="0 0 1200 120"
	  xmlns="http://www.w3.org/2000/svg"
	  style="fill: #2dbe8e; width: 100%; height: 67px; transform: rotate(180deg)"
	>
	  <path
	  d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
	  opacity=".25"
	/>
	  <path
		d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
		opacity=".5"
	  />
	  <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
	</svg>`;
	background.appendChild(backgroundTop);
	background.appendChild(backgroundMiddle);
	background.appendChild(backgroundBottom);
	document.querySelector("body").appendChild(background);
};

export { createDivs, renderCard, renderCards, renderBackground };
