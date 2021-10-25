"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const services_1 = require("../services");
const messages_1 = require("./messages");
const options_1 = require("./options");
const location_1 = require("../utils/location");
const run = async () => {
    const { city, temperature, importFile, last } = options_1.options;
    if (city) {
        await showWeatherByAnotherCity(city, temperature === 'f');
        return;
    }
    if (importFile) {
        await showWeatherByImportedLocations(importFile, temperature === 'f');
        return;
    }
    if (last) {
        await showWeatherByPreviousConfig();
        return;
    }
    await showMenuPrompt();
    const exit = await services_1.inquirerService.exit();
    if (exit.options) {
        await (0, exports.run)();
    }
};
exports.run = run;
async function showMenuPrompt() {
    const cliMenuSelectedOption = await services_1.inquirerService.menu();
    const choices = services_1.inquirerService.choices;
    switch (cliMenuSelectedOption) {
        case choices.WEATHER_IN_MY_LOCATION: {
            await showWeatherByMyLocation();
            break;
        }
        case choices.IMPORT_LOCATIONS: {
            await showWeatherByImportedLocations();
            break;
        }
        case choices.WEATHER_IN_ANOTHER_CITY: {
            await showWeatherByAnotherCity();
            break;
        }
        case choices.PREVIOUS_CONFIG: {
            await showWeatherByPreviousConfig();
            break;
        }
    }
    services_1.configService.saveConfig();
}
async function showWeatherByMyLocation() {
    const { city, countryCode } = await (0, location_1.findLocation)();
    if (city && countryCode) {
        const { city: cityConfirmed } = await services_1.inquirerService.confirmLocation(city);
        if (cityConfirmed) {
            const { isFahrenheitTemperature } = await services_1.inquirerService.temperatureFormat();
            const location = `${city}, ${countryCode}`;
            const weatherResponse = await services_1.weatherService.fetchByCityName(location);
            if (!weatherResponse || !weatherResponse.name) {
                messages_1.messages.noWeatherData(location);
                return;
            }
            showWeather(weatherResponse, isFahrenheitTemperature);
            services_1.configService.setConfig(city, isFahrenheitTemperature);
        }
    }
}
async function showWeatherByPreviousConfig() {
    const config = services_1.configService.getConfig();
    if (config === undefined) {
        messages_1.messages.noConfigExist();
        return;
    }
    const weatherResponse = await services_1.weatherService.fetchByCityName(config.city);
    if (!weatherResponse || !weatherResponse.name) {
        messages_1.messages.noWeatherData(config.city);
        return;
    }
    const { isFahrenheitTemperature } = services_1.configService.getConfig();
    showWeather(weatherResponse, isFahrenheitTemperature);
}
async function showWeatherByAnotherCity(location, isFahrenheitTemperature = false) {
    let answer;
    if (location) {
        answer = { location, isFahrenheitTemperature };
    }
    else {
        answer = await services_1.inquirerService.askCity();
    }
    const weatherResponse = await services_1.weatherService.fetchByCityName(answer.location);
    if (!weatherResponse || !weatherResponse.name) {
        messages_1.messages.noWeatherData(answer.location);
        return;
    }
    services_1.configService.setConfig(weatherResponse.name, answer.isFahrenheitTemperature);
    showWeather(weatherResponse, answer.isFahrenheitTemperature);
}
async function showWeatherByImportedLocations(filePath, isFahrenheitTemperature = false) {
    if (!filePath) {
        messages_1.messages.fileFormat();
        const response = await services_1.inquirerService.selectFile();
        filePath = response.filePath;
        isFahrenheitTemperature = response.isFahrenheitTemperature;
    }
    try {
        if (!fs.existsSync(filePath)) {
            messages_1.messages.fileNotExist(filePath);
            return;
        }
        const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        const { cities } = JSON.parse(data);
        if (!cities || cities.length === 0) {
            messages_1.messages.dataFormatNotCorrect(filePath);
            return;
        }
        services_1.weatherService.fetchByCityNames(cities)
            .then((response) => {
            if (response) {
                response.map((data) => showWeather(data, isFahrenheitTemperature));
            }
            else {
                messages_1.messages.errorMaxCitiesReached(cities.length);
            }
            messages_1.messages.pressKeyToContinue();
        });
    }
    catch (error) {
        return messages_1.messages.errorHandler();
    }
}
function showWeather(weatherResponse, isFahrenheitTemperature) {
    messages_1.messages.showWeather(weatherResponse.name, weatherResponse.sys.country, weatherResponse.main.humidity, weatherResponse.main.temp, weatherResponse.weather[0].description, isFahrenheitTemperature);
}
//# sourceMappingURL=cli.js.map