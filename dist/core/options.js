"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const tslib_1 = require("tslib");
const yargs = (0, tslib_1.__importStar)(require("yargs"));
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const dimmed = chalk_1.default.dim;
const bold = chalk_1.default.bold;
const version = require('../../package').version;
exports.options = yargs
    .usage(`\nYou can run commands with "cool-weather"\n
    Usage: cool-weather [options]`)
    .option('city', {
    alias: ['c', 'z'],
    describe: dimmed `Fetch weather for the city (example: -c Amsterdam) or zipcode(example: -z 38000, fr).`,
    string: true,
    conflicts: ['importFile'],
})
    .option('temperature', {
    alias: ['t'],
    describe: dimmed `Use Fahrenheit temperature scale (default is Celsius).`,
    string: true,
    default: 'c',
    choices: ['c', 'f'],
})
    .option('importFile', {
    alias: ['import', 'i'],
    describe: dimmed `Import file of cities for search.`,
    string: true,
})
    .option('last', {
    alias: ['l'],
    describe: dimmed `Fetch weather for the latest query.`,
    type: 'boolean',
    conflicts: ['importFile', 'city'],
})
    .help('help', dimmed `Show help`)
    .alias('help', 'h')
    .showHelpOnFail(false, bold `Specify --help for available options`)
    .version('version', dimmed `Show application version number`, (function () {
    return version;
})())
    .alias('version', 'v')
    .epilog(dimmed `\nPlease report any issues/suggestions here:\nhttps://github.com/dino10bit/cool-weather/issues\n`)
    .strict()
    .wrap(Math.min(120, yargs.terminalWidth()))
    .argv;
//# sourceMappingURL=options.js.map