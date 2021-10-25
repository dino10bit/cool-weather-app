"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const helpers_1 = require("./helpers");
class Config {
    constructor(filePath = null, defaults = {}) {
        this.filePath = filePath;
        let fileValues = {};
        if (filePath) {
            try {
                fileValues = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
            }
            catch (e) {
                throw new Error(`File does not exists, or failed reading json content of config file "${this.filePath}"`);
            }
        }
        this.store = Object.assign(defaults, fileValues);
    }
    has(key) {
        const value = (0, helpers_1.getFromDotNotation)(key.split('.'), this.store);
        return !(0, helpers_1.isUndefined)(value);
    }
    get(key, _default) {
        let value = (0, helpers_1.getFromDotNotation)(key.split('.'), this.store);
        if ((0, helpers_1.isUndefined)(value) && !(0, helpers_1.isUndefined)(_default)) {
            value = _default;
        }
        if ((0, helpers_1.isUndefined)(value)) {
            throw new Error(`"${key}" not found, and no default value is assigned!`);
        }
        return value;
    }
    is(key, value) {
        return this.get(key) === value;
    }
    set(key, value) {
        (0, helpers_1.setByDotNotation)(key.split('.'), value, this.store);
        return this;
    }
    unset(key) {
        (0, helpers_1.unsetByDotNotation)(key.split('.'), this.store);
        return this;
    }
    getStore() {
        return this.store;
    }
    size() {
        return Object.keys(this.store).length;
    }
    clear() {
        this.store = {};
        return this;
    }
    getFilePath() {
        return this.filePath;
    }
    path() {
        this.checkFilePath();
        return this.filePath;
    }
    save() {
        this.checkFilePath();
        fs.writeFileSync(this.filePath, JSON.stringify(this.store, null, 2));
        return this;
    }
    checkFilePath() {
        if (!this.filePath) {
            throw new Error('No config file path has been specified!');
        }
    }
}
exports.default = Config;
//# sourceMappingURL=index.js.map