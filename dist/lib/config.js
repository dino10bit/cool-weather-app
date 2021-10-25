'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.config = void 0;
const configstore_ts_1 = __importDefault(require('configstore-ts'));
// const pkg = require('../package.json');
// Get the previous configService
// const conf = new Configstore(pkg.name);
// const conf = new Configstore('my-weather-cli');
// interface IConfig {
//     foo: string;
//     bar: string;
// }
const conf = new configstore_ts_1.default();
exports.config = {
  getConfig() {
    return { city: conf.get('city'), tempFormat: conf.get('tempFormat') };
  },
  setConfig(city, tempFormat) {
    conf.set('city', city);
    conf.set('tempFormat', tempFormat);
  },
};
