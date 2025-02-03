let weather = [];

function processWeatherData(weatherData) {
  weather = weatherData.days.slice(0, 4).map((day, index) => {
    const givenDay = {};

    givenDay.datetime = day.datetime;

    givenDay.icon = day.icon;
    givenDay.tempmax = day.tempmax;
    givenDay.tempmin = day.tempmin;

    // Provide more details for the current day, only:

    if (index === 0) {
      givenDay.description = day.description;
      givenDay.feelslike = day.feelslike;
      givenDay.humidity = day.humidity;
      givenDay.precipprob = day.precipprob;
      if (givenDay.precipprob !== 0) {
        givenDay.preciptype = day.preciptype;
      }
      givenDay.sunrise = day.sunrise;
      givenDay.sunset = day.sunset;
      givenDay.temp = day.temp;
      givenDay.windspeed = day.windspeed;
    }

    if (index > 0) {
      givenDay.conditions = day.conditions;
    }

    return givenDay;
  });

  return weather;
}

const getWeather = () => weather;
const getWeatherIcons = weather.map((day) => day.icon);

async function fetchWeatherData(location, units) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=C5B8EVPQXT8CZT8QEQPRH7VPZ`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    return processWeatherData(weatherData);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { getWeather, getWeatherIcons, fetchWeatherData };
