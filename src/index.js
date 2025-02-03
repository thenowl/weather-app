import './styles.css';
import { fetchWeatherData } from './weather';
import { renderWeatherData, toggleUnits } from './display';

const button = document.querySelector('button');
const unitSwitch = document.querySelector('#unitSwitch');

button.addEventListener('click', renderWeatherData);
unitSwitch.addEventListener('click', toggleUnits);
