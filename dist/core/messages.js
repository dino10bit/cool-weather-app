"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const tslib_1 = require("tslib");
const clear_1 = (0, tslib_1.__importDefault)(require("clear"));
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const node_emoji_1 = require("node-emoji");
const weatherService_1 = require("../services/weatherService");
const emoji = (type) => (0, node_emoji_1.get)(type);
exports.messages = {
    noConfigExist() {
        console.log(`${chalk_1.default.redBright('Error: There is no stored configuration yet.')}`);
    },
    errorEnvApiKeyNotFound() {
        console.log(`${chalk_1.default.redBright('Error: Environment variable OPEN_WEATHER_API_KEY is not set, see README file.')}`);
    },
    welcome() {
        (0, clear_1.default)();
        console.log(chalk_1.default.green(`Weather cli ${emoji(':partly_sunny:')}.`));
    },
    locationNotFound() {
        console.log(`${chalk_1.default.redBright('Error: Location not found!')}`);
    },
    noWeatherData(location) {
        console.log(`${chalk_1.default.redBright(`Error: We don't have information about weather for the city: ${location}`)}`);
    },
    showWeather(city, country, humidity, temperature, description, isFahrenheitTemperature) {
        const temperatureFormatted = isFahrenheitTemperature
            ? `${(temperature * 9 / 5 + 32).toFixed(2)} °F`
            : `${temperature} C°`;
        console.log(`City: ${chalk_1.default.yellow(`${city}, ${country}`)} 
             Temperature: ${chalk_1.default.green(temperatureFormatted)} 
             Humidity: ${chalk_1.default.green(`${humidity}%`)} 
             Description: ${chalk_1.default.green(addEmojiToDescription(description))}`);
    },
    errorHandler() {
        console.log(`${chalk_1.default.redBright('Error: Can\'t find the requested city. Please try another city.')}`);
    },
    fileNotExist(filePath) {
        console.log(`${chalk_1.default.redBright('Error: File is not exist at the given path:')}
             ${chalk_1.default.yellow(filePath)}`);
    },
    pressKeyToContinue() {
        console.log(chalk_1.default.yellow('Press any key to continue'));
    },
    fileFormat() {
        console.log(`${chalk_1.default.redBright('Format accepted:')} ${chalk_1.default.greenBright('{ "cities": ["Madrid", "Berlin" ...] }')} 
            \n${chalk_1.default.yellow(`Max ${weatherService_1.MAX_AMOUNT_OF_CITIES} cities accepted.`)}`);
    },
    errorMaxCitiesReached(amountOfCities) {
        console.log(`${chalk_1.default.redBright(`Error: You requested more then maximum (${weatherService_1.MAX_AMOUNT_OF_CITIES}) amount of cities: ${amountOfCities}.`)}`);
    },
    dataFormatNotCorrect(fileName) {
        console.log(`${chalk_1.default.redBright(`Error: data format is not correct in the file: ${fileName}`)}`);
        exports.messages.fileFormat();
    },
};
function addEmojiToDescription(description) {
    switch (description) {
        case 'broken clouds':
            description += emoji(':mostly_sunny:');
            break;
        case 'clear sky':
            description += emoji(':sun_with_face:');
            break;
        case 'thunderstorm with light rain':
            description += emoji(':lightning_cloud:');
            break;
        case 'overcast clouds':
            description += emoji(':partly_sunny:');
            break;
        case 'scattered clouds':
            description += emoji(':partly_sunny:');
            break;
    }
    return description + ' ';
}
//# sourceMappingURL=messages.js.map