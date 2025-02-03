const { format } = require('date-fns');

let weather = [];

function processWeatherData(weatherData) {
  weather = weatherData[0].days.slice(0, 4).map((day, index) => {
    const givenDay = {};
    const fahrenheit = weatherData[1].days[index];

    if (index === 0) {
      givenDay.location = weatherData[0].resolvedAddress;
      givenDay.datetime = format(day.datetime, 'PPPP');
      givenDay.description = day.description;
      givenDay.icon = day.icon;
      givenDay.tempC = day.temp;
      givenDay.tempF = fahrenheit.temp;
      givenDay.tempmaxC = day.tempmax;
      givenDay.tempminC = day.tempmin;
      givenDay.tempmaxF = fahrenheit.tempmax;
      givenDay.tempminF = fahrenheit.tempmin;
      givenDay.supplementary = {};

      givenDay.supplementary.feelslikeC = day.feelslike;
      givenDay.supplementary.feelslikeF = fahrenheit.feelslike;
      givenDay.supplementary.humidity = day.humidity;
      givenDay.supplementary.precipprob = day.precipprob;
      if (givenDay.supplementary.precipprob !== 0) {
        givenDay.supplementary.preciptype = day.preciptype;
      }
      givenDay.supplementary.windspeed = day.windspeed;
      givenDay.supplementary.sunrise = day.sunrise;
      givenDay.supplementary.sunset = day.sunset;
    }

    if (index > 0) {
      givenDay.datetime = format(day.datetime, 'eeee');
      givenDay.conditions = day.conditions;
      givenDay.icon = day.icon;
      givenDay.tempmaxC = day.tempmax;
      givenDay.tempminC = day.tempmin;
      givenDay.tempmaxF = fahrenheit.tempmax;
      givenDay.tempminF = fahrenheit.tempmin;
    }
    return givenDay;
  });
  return weather;
}

const getWeather = () => weather;
const getWeatherIcons = weather.map((day) => day.icon);

async function fetchWeatherData(location) {
  const metric = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=C5B8EVPQXT8CZT8QEQPRH7VPZ`;
  const fahrenheit = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=C5B8EVPQXT8CZT8QEQPRH7VPZ`;

  try {
    const responseMetric = await fetch(metric, { mode: 'cors' });
    const responseFahrenheit = await fetch(fahrenheit, { mode: 'cors' });
    const [weatherDataMetric, weatherDataFahrenheit] = await Promise.all([
      responseMetric.json(),
      responseFahrenheit.json(),
    ]);
    return processWeatherData([weatherDataMetric, weatherDataFahrenheit]);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { getWeather, getWeatherIcons, fetchWeatherData };
