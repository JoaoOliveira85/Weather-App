import { doc } from "prettier";
import { getWeatherData } from "./modules/api-requests.js";
import {
	createDivs,
	renderCards,
	renderBackground,
} from "./modules/DOMrender.js";
import { cityList } from "./modules/dataSet.js";
import "./styles/styles.css";

const canvas = document.createElement("main");
canvas.id = "canvas";
document.querySelector("body").appendChild(canvas);
createDivs(
	canvas,
	"div",
	3,
	["title", "weatherBoard", "options"],
	["mainContent"]
);

document.querySelector("#title").innerText = "Local Weather";
const optionsMenu = document.createElement("div");
optionsMenu.id = "optionsMenu";
document.querySelector("#options").appendChild(optionsMenu);
const addCityInput = document.createElement("input");
addCityInput.id = "addCityInput";

const addCityButton = document.createElement("button");
addCityButton.id = "addCityButton";
addCityButton.innerText = "Add City";
addCityButton.addEventListener("click", () => {
	cityList.push(addCityInput.value.toLowerCase());
	localStorage.setItem("cityList", JSON.stringify(cityList));
	renderCards(cityList, metricRadio.checked ? "metric" : "imperial");
});

const metricRadio = document.createElement("input");
const metricLabel = document.createElement("label");
const imperialRadio = document.createElement("input");
const imperialLabel = document.createElement("label");

metricRadio.type = "radio";
imperialRadio.type = "radio";
metricRadio.id = "metric";
imperialRadio.id = "imperial";
metricRadio.value = "metric";
imperialRadio.value = "imperial";
metricRadio.className = "unitButtons";
imperialRadio.className = "unitButtons";
metricRadio.name = "units";
imperialRadio.name = "units";
metricRadio.setAttribute("checked", "");

metricLabel.setAttribute("for", "metric");
imperialLabel.setAttribute("for", "imperial");
metricLabel.innerText = "Metric";
imperialLabel.innerText = "Imperial";

metricLabel.addEventListener("click", () => {
	renderCards(cityList, "metric");
});

imperialLabel.addEventListener("click", () => {
	renderCards(cityList, "imperial");
});

document.querySelector("#optionsMenu").appendChild(addCityInput);
document.querySelector("#optionsMenu").appendChild(addCityButton);
document.querySelector("#optionsMenu").appendChild(metricRadio);
document.querySelector("#optionsMenu").appendChild(metricLabel);
document.querySelector("#optionsMenu").appendChild(imperialRadio);
document.querySelector("#optionsMenu").appendChild(imperialLabel);

renderCards(cityList, metricRadio.checked ? "metric" : "imperial");

renderBackground();
