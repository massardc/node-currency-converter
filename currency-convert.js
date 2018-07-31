const axios = require('axios');
const config = require('./config/config.json');

// Non async getExchangeRate function
// const getExchangeRate = (from, to) => {
//   return axios.get(`http://data.fixer.io/api/latest?access_key=${config.apiKey}`).then((response) => {
//     const fromRate = response.data.rates[from];
//     const toRate = response.data.rates[to];
//     return toRate / fromRate;
//   });
// };

// Async getExchangeRate function
const getExchangeRate = async (from, to) => {
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${config.apiKey}`); 

  const fromRate = response.data.rates[from];
  const toRate = response.data.rates[to];
  return toRate / fromRate;
};

// Async getCountries function
const getCountries = async (currencyCode) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  
  return response.data.map(country => country.name);
}

// Non async convertCurrency function
// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to).then((rate) => {
//     convertedAmount = (rate * amount).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//       return `${amount} from ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}.`;
//   });
// };

// Async convertCurrency function
const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (amount * rate).toFixed(2);
  const countries = await getCountries(to);

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('EUR', 'JPY', 100).then((message) => {
  console.log(message);
});