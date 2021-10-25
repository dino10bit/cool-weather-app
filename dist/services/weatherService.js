"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchByCityNames = exports.fetchByCityName = exports.MAX_AMOUNT_OF_CITIES = void 0;
const tslib_1 = require("tslib");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const cli = (0, tslib_1.__importStar)(require("clui"));
const bottleneck_1 = (0, tslib_1.__importDefault)(require("bottleneck"));
exports.MAX_AMOUNT_OF_CITIES = 10;
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
async function fetchByCityName(city) {
    const rateLimiter = getRateLimiter();
    const spinnerStatus = new cli.Spinner(`Fetching weather for city: ${city}...`);
    spinnerStatus.start();
    try {
        const weatherUrl = `${OPEN_WEATHER_API_URL}?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        const response = await rateLimiter.schedule(() => (0, got_1.default)(weatherUrl));
        spinnerStatus.stop();
        return JSON.parse(response.body);
    }
    catch (error) {
        spinnerStatus.stop();
    }
}
exports.fetchByCityName = fetchByCityName;
async function fetchByCityNames(cities) {
    return (cities.length <= exports.MAX_AMOUNT_OF_CITIES)
        ? Promise.all(cities.map((city) => fetchByCityName(city)))
        : false;
}
exports.fetchByCityNames = fetchByCityNames;
function getRateLimiter() {
    return new bottleneck_1.default({
        reservoir: 40,
        reservoirIncreaseAmount: 2,
        reservoirIncreaseInterval: 1000,
        reservoirIncreaseMaximum: 40,
        maxConcurrent: 5,
        minTime: 250,
    });
}
//# sourceMappingURL=weatherService.js.map