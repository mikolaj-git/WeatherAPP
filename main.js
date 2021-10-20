const img = document.querySelector('.header-section__img');
const city = document.querySelector('.search-section__city-name');
const input = document.querySelector('.search-section__input');
const btn = document.querySelector('.search-section__btn');
const error = document.querySelector('.search-section__error');
const weeather = document.querySelector('.information-section__weather');
const temp = document.querySelector('.information-section__temp');
const press = document.querySelector('.information-section__press');
const speed = document.querySelector('.information-section__speed');
const chill = document.querySelector('.information-section__chill');
const hum = document.querySelector('.information-section__hum');

const p = document.querySelector('p');

const checkWeather = () => {
	const cityName = input.value || 'Warsaw';

	const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=00601dc5a4416ca208a6fa08ada0da1a&units=metric`;

	axios
		.get(API_LINK)
		.then((res) => {
			console.log(res);

			const { name, main, wind, weather } = res.data;

			const nameP = name;
			const weatherP = weather[0].main;
			const weatherIcon = weather[0].icon;
			const tempP = main.temp;
			const pressP = main.pressure;
			const speedP = wind.speed;
			const chillP = wind.gust;
			const humP = main.humidity;

			city.textContent = nameP;
			weeather.textContent = weatherP;
			temp.textContent = Math.floor(tempP) + '°C';
			press.textContent = pressP + ' hPa';
			speed.textContent = speedP + ' m/s';
			chill.textContent = chillP + ' m/s';
			hum.textContent = humP + '%';

			input.value = '';
			error.textContent = '';

			if (weatherIcon) {
				img.setAttribute(
					'src',
					`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
				);
			}

			if (!chillP) {
				chill.textContent = `no data`;
			}
		})
		.catch(() => (error.textContent = 'enter a valid city name'));
};

checkWeather();

btn.addEventListener('click', () => {
	checkWeather();
});

input.addEventListener('keyup', (e) => {
	if (event.keyCode === 13) {
		btn.click();
	}
});
