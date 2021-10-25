'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fetchDataOW = void 0;
const got = require('got');
const CLI = require('clui');
const dotenv = require('dotenv');
const Spinner = CLI.Spinner;
// Get the configService from the .env file
dotenv.config();
exports.fetchDataOW = {
  async basicFetch(city) {
    const status = new Spinner('Asking the frog how she feels...');
    status.start();
    try {
      const response = await got(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OW_API_KEY}`);
      status.stop();
      return JSON.parse(response.body);
    } catch (error) {
      status.stop();
      return false;
    }
  },
  async getMultipleWeather(citiesArr) {
    console.log(citiesArr);
    if (citiesArr.length <= 10) {
      return Promise.all(citiesArr.map((city) => module.exports.basicFetch(city)));
    }
    return false;
  },
};
