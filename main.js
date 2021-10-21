const img = document.querySelector('.header-section__img');
const city = document.querySelector('.search-section__city-name');
const input = document.querySelector('.search-section__input');
const btn = document.querySelector('.search-section__btn');
const error = document.querySelector('.search-section__error');
const weatherElement = document.querySelector('.information-section__weather');
const tempElement = document.querySelector('.information-section__temp');
const pressElement = document.querySelector('.information-section__press');
const speedElement = document.querySelector('.information-section__speed');
const chillElement = document.querySelector('.information-section__chill');
const humElement = document.querySelector('.information-section__hum');

const checkWeather = (cityName = 'Warsaw') => {
	const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=00601dc5a4416ca208a6fa08ada0da1a&units=metric`;

	axios
		.get(API_LINK)
		.then((res) => {
			console.log(res);

			const { name, main, wind, weather } = res.data;
			const { humidity, pressure, temp } = main;
			const { speed, gust } = wind;

			const weatherIcon = weather[0].icon;

			city.textContent = name;
			weatherElement.textContent = weather[0].main;
			tempElement.textContent = Math.floor(temp) + '°C';
			pressElement.textContent = pressure + ' hPa';
			speedElement.textContent = speed + ' m/s';
			chillElement.textContent = gust + ' m/s';
			humElement.textContent = humidity + '%';

			input.value = '';
			error.textContent = '';

			

			if (!gust) {
				chillElement.textContent = `no data`;
			}
		})
		.catch(() => (error.textContent = 'enter a valid city name'));
};

checkWeather();

btn.addEventListener('click', () => {
	checkWeather((cityName = input.value));
});

input.addEventListener('keyup', (e) => {
	if (event.keyCode === 13) {
		btn.click();
	}
});
