import { fetchWeatherData, getWeather } from './weather';
// import icon from `./icons/${weather[0].icon}.svg`;

function importAll(r) {
  const icons = {};
  r.keys().map((item) => {
    icons[item.replace('./', '')] = r(item);
  });
  return icons;
}

const icons = importAll(require.context('./icons', false, /\.svg$/));

// RENDER WEATHER DATA:

async function renderWeatherData() {
  const locationInput = document.querySelector('#location').value;
  const unit = document.querySelector('#unitSwitch');
  const weatherDisplay = document.querySelector('#weatherDisplay');

  if (!locationInput) return;

  const weather = await fetchWeatherData(locationInput);

  const label = document.querySelector('.location-label');
  const welcomeContainer = document.querySelector('.welcome-container');

  if (label && welcomeContainer) {
    document.querySelector('form').removeChild(label);
    document
      .querySelector('#userInteractContainer')
      .removeChild(welcomeContainer);
  }

  weatherDisplay.textContent = '';

  const todayIcon = icons[`${weather[0].icon}.svg`];

  const todayContainer = document.createElement('div');
  todayContainer.classList.add('today-container');

  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');
  todayCard.style.backgroundImage = `url(${todayIcon})`;

  const upperCardContent = document.createElement('div');
  upperCardContent.classList.add('upper-card-content');

  const location = document.createElement('h2');
  location.classList.add('location');
  location.textContent = weather[0].location;

  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = weather[0].datetime;

  const lowerCardContent = document.createElement('div');
  lowerCardContent.classList.add('lower-card-content');

  const temperature = document.createElement('p');
  temperature.classList.add('temperature');

  const tempRange = document.createElement('p');
  tempRange.classList.add('tempRange');

  const tempUnit = document.createElement('span');
  tempUnit.classList.add('temperature-unit');

  if (unit.checked) {
    tempUnit.textContent = '°C';
    temperature.textContent = `${weather[0].tempC}°C`;
    tempRange.textContent = `${weather[0].tempminC}°C / ${weather[0].tempmaxC}°C`;
  } else {
    temperature.textContent = `${weather[0].tempF}°F`;
    tempRange.textContent = `${weather[0].tempminF}°F / ${weather[0].tempmaxF}°F`;
  }

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = weather[0].description;

  weatherDisplay.appendChild(todayContainer);
  todayContainer.appendChild(todayCard);
  todayCard.appendChild(upperCardContent);
  upperCardContent.appendChild(location);
  upperCardContent.appendChild(date);
  todayCard.appendChild(lowerCardContent);
  lowerCardContent.appendChild(temperature);
  lowerCardContent.appendChild(tempRange);
  lowerCardContent.appendChild(description);

  const todayDetailsCard = document.createElement('div');
  todayDetailsCard.classList.add('today-details-card');

  const feelsLikeContainer = document.createElement('div');
  const feelsLikeTitleIconContainer = document.createElement('div');
  const feelsLikeIcon = document.createElement('span');
  feelsLikeIcon.innerHTML = '<i class="fa-solid fa-temperature-half"></i>';
  const feelsLikeText = document.createElement('h3');
  feelsLikeText.innerText = 'Perceived Temperature';
  const feelsLikeData = document.createElement('p');
  feelsLikeData.id = 'feelsLikeData';
  feelsLikeContainer.appendChild(feelsLikeTitleIconContainer);
  feelsLikeTitleIconContainer.appendChild(feelsLikeIcon);
  feelsLikeTitleIconContainer.appendChild(feelsLikeText);
  feelsLikeContainer.appendChild(feelsLikeData);

  const humidityContainer = document.createElement('div');
  const humidityTitleIconContainer = document.createElement('div');
  const humidityIcon = document.createElement('span');
  humidityIcon.innerHTML = '<i class="fa-solid fa-droplet"></i>';
  const humidityText = document.createElement('h3');
  humidityText.innerText = 'Humidity';
  const humidityData = document.createElement('p');
  humidityData.textContent = `${weather[0].supplementary.humidity}%`;
  humidityContainer.appendChild(humidityTitleIconContainer);
  humidityTitleIconContainer.appendChild(humidityIcon);
  humidityTitleIconContainer.appendChild(humidityText);
  humidityContainer.appendChild(humidityData);

  const precipProbContainer = document.createElement('div');
  const precipProbTitleIconContainer = document.createElement('div');
  const precipProbIcon = document.createElement('span');
  precipProbIcon.innerHTML = '<i class="fa-solid fa-umbrella"></i>';
  const precipProbText = document.createElement('h3');
  precipProbText.innerText = 'Precipitation Probability';
  const precipProbData = document.createElement('p');
  precipProbData.textContent = `${weather[0].supplementary.precipprob}%`;
  precipProbContainer.appendChild(precipProbTitleIconContainer);
  precipProbTitleIconContainer.appendChild(precipProbIcon);
  precipProbTitleIconContainer.appendChild(precipProbText);
  precipProbContainer.appendChild(precipProbData);

  const windContainer = document.createElement('div');
  const windTitleIconContainer = document.createElement('div');
  const windIcon = document.createElement('span');
  windIcon.innerHTML = '<i class="fa-solid fa-wind"></i>';
  const windText = document.createElement('h3');
  windText.innerText = 'Wind Speed';
  const windData = document.createElement('p');
  windData.textContent = `${weather[0].supplementary.windspeed}`;
  windContainer.appendChild(windTitleIconContainer);
  windTitleIconContainer.appendChild(windIcon);
  windTitleIconContainer.appendChild(windText);
  windContainer.appendChild(windData);

  const sunriseContainer = document.createElement('div');
  const sunriseTitleIconContainer = document.createElement('div');
  const sunriseIcon = document.createElement('span');
  sunriseIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
  const sunriseText = document.createElement('h3');
  sunriseText.innerText = 'Sunrise';
  const sunriseData = document.createElement('p');
  sunriseData.textContent = `${weather[0].supplementary.sunrise}`;
  sunriseContainer.appendChild(sunriseTitleIconContainer);
  sunriseTitleIconContainer.appendChild(sunriseIcon);
  sunriseTitleIconContainer.appendChild(sunriseText);
  sunriseContainer.appendChild(sunriseData);

  const sunsetContainer = document.createElement('div');
  const sunsetTitleIconContainer = document.createElement('div');
  const sunsetIcon = document.createElement('span');
  sunsetIcon.innerHTML = '<i class="fa-regular fa-sun"></i>';
  const sunsetText = document.createElement('h3');
  sunsetText.innerText = 'Sunset';
  const sunsetData = document.createElement('p');
  sunsetData.textContent = `${weather[0].supplementary.sunset}`;
  sunsetContainer.appendChild(sunsetTitleIconContainer);
  sunsetTitleIconContainer.appendChild(sunsetIcon);
  sunsetTitleIconContainer.appendChild(sunsetText);
  sunsetContainer.appendChild(sunsetData);

  if (unit.checked) {
    feelsLikeData.textContent = `${weather[0].supplementary.feelslikeC}°C`;
  } else {
    feelsLikeData.textContent = `${weather[0].supplementary.feelslikeF}°F`;
  }

  todayContainer.appendChild(todayDetailsCard);
  todayDetailsCard.appendChild(feelsLikeContainer);
  todayDetailsCard.appendChild(humidityContainer);
  todayDetailsCard.appendChild(precipProbContainer);
  todayDetailsCard.appendChild(windContainer);
  todayDetailsCard.appendChild(sunriseContainer);
  todayDetailsCard.appendChild(sunsetContainer);

  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecast-container');
  weatherDisplay.appendChild(forecastContainer);

  weather.map((day, index) => {
    if (index === 0) return;

    const givenDayIcon = icons[`${weather[index].icon}.svg`];

    const dayContainer = document.createElement('div');
    dayContainer.classList.add('day-container');
    dayContainer.style.backgroundImage = `url(${givenDayIcon})`;

    const givenDay = document.createElement('h3');
    givenDay.textContent = day.datetime;

    const lowerInformation = document.createElement('div');
    lowerInformation.classList.add('lower-information');

    const givenDayTemperatures = document.createElement('p');
    givenDayTemperatures.id = `givenDayTemperatures${index}`;
    givenDayTemperatures.classList.add('given-day-temperatures');

    if (unit.checked) {
      givenDayTemperatures.textContent = `${weather[index].tempminC}°C / ${weather[index].tempmaxC}°C`;
    } else {
      givenDayTemperatures.textContent = `${weather[index].tempminF}°F / ${weather[index].tempmaxF}°F`;
    }

    const givenDayDescription = document.createElement('p');
    givenDayDescription.textContent = weather[index].conditions;

    dayContainer.appendChild(givenDay);
    dayContainer.appendChild(lowerInformation);
    lowerInformation.appendChild(givenDayTemperatures);
    lowerInformation.appendChild(givenDayDescription);
    forecastContainer.appendChild(dayContainer);
  });
}

// TOGGLE BETWEEN CELCIUS AND FAHRENHEIT UNITS:

function toggleUnits() {
  const weather = getWeather();
  const unit = document.querySelector('#unitSwitch');

  if (weather.length === 0) return;

  const temperature = document.querySelector('.temperature');
  const tempRange = document.querySelector('.tempRange');
  const feelsLikeData = document.querySelector('#feelsLikeData');
  const givenDayTemperatures1 = document.querySelector(
    '#givenDayTemperatures1',
  );
  const givenDayTemperatures2 = document.querySelector(
    '#givenDayTemperatures2',
  );
  const givenDayTemperatures3 = document.querySelector(
    '#givenDayTemperatures3',
  );

  if (unit.checked) {
    temperature.textContent = `${weather[0].tempC}°C`;
    tempRange.textContent = `${weather[0].tempminC}°C / ${weather[0].tempmaxC}°C`;
    feelsLikeData.textContent = `${weather[0].supplementary.feelslikeC}°C`;
    givenDayTemperatures1.textContent = `${weather[1].tempminC}°C / ${weather[1].tempmaxC}°C`;
    givenDayTemperatures2.textContent = `${weather[2].tempminC}°C / ${weather[2].tempmaxC}°C`;
    givenDayTemperatures3.textContent = `${weather[3].tempminC}°C / ${weather[3].tempmaxC}°C`;
  } else {
    temperature.textContent = `${weather[0].tempF}°F`;
    tempRange.textContent = `${weather[0].tempminF}°F / ${weather[0].tempmaxF}°F`;
    feelsLikeData.textContent = `${weather[0].supplementary.feelslikeF}°F`;
    givenDayTemperatures1.textContent = `${weather[1].tempminF}°F / ${weather[1].tempmaxF}°F`;
    givenDayTemperatures2.textContent = `${weather[2].tempminF}°F / ${weather[2].tempmaxF}°F`;
    givenDayTemperatures3.textContent = `${weather[3].tempminF}°F / ${weather[3].tempmaxF}°F`;
  }
}

// CREATE THE FORM SECTION OF THE PAGE:

function createForm() {
  const form = document.createElement('form');

  const label = document.createElement('label');
  label.setAttribute('for', 'location');
  label.classList.add('location-label');
  label.textContent = 'Search for a location to view its weather forecast';

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  const searchbarContainer = document.createElement('div');
  searchbarContainer.classList.add('searchbar-container');
  const searchbar = document.createElement('input');
  searchbar.type = 'text';
  searchbar.id = 'location';
  searchbar.name = 'location';
  searchbar.classList.add('location-input');
  searchbar.placeholder = 'Search Location...';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Search';
  inputContainer.appendChild(searchbarContainer);
  searchbarContainer.appendChild(searchbar);
  searchbarContainer.appendChild(button);

  const switchContainer = document.createElement('div');
  switchContainer.classList.add('switch-container');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.role = 'switch';
  checkbox.id = 'unitSwitch';
  checkbox.checked = true;
  checkbox.classList.add('unit-switch');
  const unitContainer = document.createElement('div');
  unitContainer.classList.add('unit-container');
  const celcius = document.createElement('span');
  celcius.textContent = '°C';
  const fahrenheit = document.createElement('span');
  fahrenheit.textContent = '°F';
  inputContainer.appendChild(switchContainer);
  switchContainer.appendChild(checkbox);
  switchContainer.appendChild(unitContainer);
  unitContainer.appendChild(celcius);
  unitContainer.appendChild(fahrenheit);

  form.appendChild(label);
  form.appendChild(inputContainer);
  button.addEventListener('click', renderWeatherData);
  checkbox.addEventListener('click', toggleUnits);

  return form;
}

// INITIALIZE PAGE:

function initPageLoad() {
  const userInteractContainer = document.querySelector(
    '#userInteractContainer',
  );
  userInteractContainer.textContent = '';

  const weatherDisplay = document.querySelector('#weatherDisplay');
  weatherDisplay.textContent = '';

  const welcomeContainer = document.createElement('div');
  welcomeContainer.classList.add('welcome-container');
  const welcomeMessage = document.createElement('h2');
  welcomeMessage.textContent = 'Welcome to weathery';

  welcomeContainer.appendChild(welcomeMessage);
  userInteractContainer.appendChild(welcomeContainer);
  userInteractContainer.appendChild(createForm());
}

const weathery = document.querySelector('h1');
weathery.addEventListener('click', initPageLoad);

export { initPageLoad, createForm, renderWeatherData, toggleUnits };
