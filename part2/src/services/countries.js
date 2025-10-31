import axios from "axios";
// All countries API endpoint
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
// Country by name API endpoint
const land = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAllCountries = () => {
  return axios.get(url);
};

const showFoundCountry = (countryName) => {
  return axios.get(`${land}/${countryName}`);
};

export default { getAllCountries, showFoundCountry };
