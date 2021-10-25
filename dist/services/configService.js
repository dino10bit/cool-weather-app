"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvVariables = exports.saveConfig = exports.setConfig = exports.getConfig = void 0;
const tslib_1 = require("tslib");
const config_1 = (0, tslib_1.__importDefault)(require("../utils/config"));
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const messages_1 = require("../core/messages");
const filePath = path_1.default.join(__dirname, '../../config.json');
const config = new config_1.default(filePath, { city: '', isFahrenheitTemperature: false });
dotenv.config();
function getConfig() {
    const city = config.get('city');
    const isFahrenheitTemperature = config.get('isFahrenheitTemperature');
    return (city !== undefined && isFahrenheitTemperature !== undefined) ? { city, isFahrenheitTemperature } : undefined;
}
exports.getConfig = getConfig;
function setConfig(city, isFahrenheitTemperature) {
    config.set('city', city);
    config.set('isFahrenheitTemperature', isFahrenheitTemperature);
}
exports.setConfig = setConfig;
function saveConfig() {
    config.save();
}
exports.saveConfig = saveConfig;
function checkEnvVariables() {
    let success = true;
    if (process.env.OPEN_WEATHER_API_KEY) {
        messages_1.messages.errorEnvApiKeyNotFound();
        success = false;
    }
    return success;
}
exports.checkEnvVariables = checkEnvVariables;
//# sourceMappingURL=configService.js.map