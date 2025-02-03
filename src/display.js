import { fetchWeatherData } from './weather';

const unit = document.querySelector('#unitSwitch');
const weatherDisplay = document.querySelector('#weatherDisplay');
let weather = [];

export default async function renderWeatherData() {
  const locationInput = document.querySelector('#location').value;
  weather = await fetchWeatherData(locationInput);

  weatherDisplay.textContent = '';

  const todayCard = document.createElement('div');
  todayCard.classList.add('today-card');

  const location = document.createElement('h2');
  location.classList.add('location');
  location.textContent = weather[0].location;

  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = weather[0].datetime;

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = weather[0].description;

  const tempContainer = document.createElement('div');
  tempContainer.classList.add('temp-container');

  const temperature = document.createElement('p');
  temperature.classList.add('temperature');

  const tempMin = document.createElement('p');
  tempMin.classList.add('tempMin');

  const tempMax = document.createElement('p');
  tempMax.classList.add('tempMax');

  if (unit.checked === true) {
    temperature.textContent = weather[0].tempC;
    tempMin.textContent = weather[0].tempminC;
    tempMax.textContent = weather[0].tempmaxC;
  } else {
    temperature.textContent = weather[0].tempF;
    tempMin.textContent = weather[0].tempminF;
    tempMax.textContent = weather[0].tempmaxF;
  }

  weatherDisplay.appendChild(todayCard);
  todayCard.appendChild(location);
  todayCard.appendChild(date);
  todayCard.appendChild(description);
  todayCard.appendChild(tempContainer);
  tempContainer.appendChild(temperature);
  tempContainer.appendChild(tempMin);
  tempContainer.appendChild(tempMax);
}

function toggleUnits() {
  if (weather.length === 0) return;
  const temperature = document.querySelector('.temperature');
  const tempMin = document.querySelector('.tempMin');
  const tempMax = document.querySelector('.tempMax');

  if (unit.checked === true) {
    temperature.textContent = weather[0].tempC;
    tempMin.textContent = weather[0].tempminC;
    tempMax.textContent = weather[0].tempmaxC;
  } else {
    temperature.textContent = weather[0].tempF;
    tempMin.textContent = weather[0].tempminF;
    tempMax.textContent = weather[0].tempmaxF;
  }
}

export { renderWeatherData, toggleUnits };
