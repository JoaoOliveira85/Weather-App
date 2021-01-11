let cityList;

if (!localStorage.getItem("cityList")) {
	cityList = [
		"porto",
		"bustelo",
		"oxford",
		"vila verde",
		"lisboa",
		"coimbra",
		"braga",
		"aveiro",
		"setúbal",
	];
} else {
	cityList = JSON.parse(localStorage.getItem("cityList"));
}

export { cityList };
