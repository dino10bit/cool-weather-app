'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.basicLocalizedFetch = void 0;
const got = require('got');
const CLI = require('clui');
const Spinner = CLI.Spinner;
async function basicLocalizedFetch() {
  const status = new Spinner('Asking the frog how she feels...');
  status.start();
  try {
    const response = await got('http://ip-api.com/json/');
    status.stop();
    return JSON.parse(response.body);
  } catch (error) {
    status.stop();
    return false;
  }
}
exports.basicLocalizedFetch = basicLocalizedFetch;

// # sourceMappingURL=detectLocationService.js.map
