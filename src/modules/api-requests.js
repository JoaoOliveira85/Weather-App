const API_KEY = "7891d1aea4ca8726e3abc8f8625880b7";
const API_URL = "api.openweathermap.org/data/2.5/";

const getWeatherData = async function (city, units) {
	console.log(units);
	const dataRequest = await fetch(
		`https://${API_URL}weather?q=${city}&appid=${API_KEY}&units=${units}&lang=en`
	);
	const dataJson = await dataRequest.json();
	const weatherData = await dataJson;
	console.log(weatherData);
	return weatherData;
};

export { getWeatherData };
