'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const fs = (0, tslib_1.__importStar)(require('fs'));
class Config {
  constructor(filePath = null, defaults = {}) {
    this.filePath = filePath;
    let fileValues = {};
    if (filePath) {
      try {
        fileValues = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
      } catch (e) {
        throw new Error(`File does not exists, or failed reading json content of config file "${this.filePath}"`);
      }
    }
    this.store = Object.assign(defaults, fileValues);
  }
}
exports.default = Config;
// # sourceMappingURL=index2.js.map
