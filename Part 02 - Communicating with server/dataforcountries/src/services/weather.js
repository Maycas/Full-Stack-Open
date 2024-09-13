import axios from 'axios';

const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = (city) => {
  return axios
    .get(`${baseUrl}?q=${city}&appid=${openWeatherAPIKey}`)
    .then((response) => response.data);
};

export default {
  getWeatherData,
};
