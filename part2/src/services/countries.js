import axios from "axios";
// All countries API endpoint
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
// Country by name API endpoint
const land = "https://studies.cs.helsinki.fi/restcountries/api/name";
// getting weather info from another API
const apiKey = import.meta.env.VITE_FORECAST_API_KEY;
const urlWeather = "http://api.weatherapi.com/v1/forecast.json?key=" + `${apiKey}` + "&q=";
const foreParam = "&days=1&aqi=no&alerts=no";

const getAllCountries = () => {
  return axios.get(url);
};
// Get country by name
// countryName is the argument passed to the function in App
const showFoundCountry = (countryName) => {
  return axios.get(`${land}/${countryName}`);
};

const getWeather = (countryName) => {
  return axios.get(`${urlWeather}${countryName}${foreParam}`);
};

export default { getAllCountries, showFoundCountry, getWeather };
