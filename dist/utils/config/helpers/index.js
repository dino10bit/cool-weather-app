"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = exports.unsetByDotNotation = exports.setByDotNotation = exports.getRoot = exports.getFromDotNotation = void 0;
const getFromDotNotation = (keys, store) => {
    if (!keys.length) {
        throw new Error('Key is empty!');
    }
    const key = keys.shift();
    return !keys.length || !store[key] ? store[key] : (0, exports.getFromDotNotation)(keys, store[key]);
};
exports.getFromDotNotation = getFromDotNotation;
const getRoot = (keys, store) => {
    if (!keys.length) {
        throw new Error('Key is empty!');
    }
    const lastProp = keys.pop();
    const root = keys.length ? (0, exports.getFromDotNotation)(keys, store) : store;
    if ((0, exports.isUndefined)(root)) {
        throw new Error(`path "${[...keys, lastProp].join('.')}" cannot be set!
        Make sure upper levels are of type object. Settings object property without defining top level object will cause this error!`);
    }
    return { root, lastProp };
};
exports.getRoot = getRoot;
const setByDotNotation = (keys, value, store) => {
    const { root, lastProp } = (0, exports.getRoot)(keys, store);
    root[lastProp] = value;
};
exports.setByDotNotation = setByDotNotation;
const unsetByDotNotation = (keys, store) => {
    const { root, lastProp } = (0, exports.getRoot)(keys, store);
    delete root[lastProp];
};
exports.unsetByDotNotation = unsetByDotNotation;
const isUndefined = (value) => typeof value === 'undefined';
exports.isUndefined = isUndefined;
//# sourceMappingURL=index.js.map