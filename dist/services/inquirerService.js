"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.confirmLocation = exports.temperatureFormat = exports.selectFile = exports.askCity = exports.menu = exports.choices = void 0;
const tslib_1 = require("tslib");
const path = (0, tslib_1.__importStar)(require("path"));
const inquirer = (0, tslib_1.__importStar)(require("inquirer"));
const inquirer_file_tree_selection_prompt_1 = (0, tslib_1.__importDefault)(require("inquirer-file-tree-selection-prompt"));
inquirer.registerPrompt('file-tree-selection', inquirer_file_tree_selection_prompt_1.default);
exports.choices = {
    WEATHER_IN_MY_LOCATION: 'Weather in my location',
    WEATHER_IN_ANOTHER_CITY: 'Weather in another city',
    IMPORT_LOCATIONS: 'Import locations',
    PREVIOUS_CONFIG: 'Previous configuration',
};
async function menu() {
    const response = await inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'Please make a choice:',
            choices: Object.values(exports.choices),
            default: 'Check the weather of a city',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Choose an option';
            },
        },
    ]);
    return response.options;
}
exports.menu = menu;
function askCity() {
    return inquirer.prompt([
        {
            name: 'location',
            type: 'input',
            message: 'Provide city name or (zip code, country code):',
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter a city or a zip code.';
            },
        },
        {
            name: 'isFahrenheitTemperature',
            type: 'confirm',
            message: 'Convert into Fahrenheit (default is Celsius):',
            default: false,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter yes or no.';
            },
        },
    ]);
}
exports.askCity = askCity;
function selectFile() {
    return inquirer.prompt([
        {
            name: 'filePath',
            type: 'file-tree-selection',
            message: 'Select a file:',
            root: './examples',
            validate(item) {
                if (path.extname(item) === '.json') {
                    return true;
                }
                return 'Select a JSON file.';
            },
        },
        {
            name: 'isFahrenheitTemperature',
            type: 'confirm',
            message: 'Convert into Fahrenheit (default Celsius):',
            default: false,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter yes or no.';
            },
        },
    ]);
}
exports.selectFile = selectFile;
function temperatureFormat() {
    return inquirer.prompt([
        {
            name: 'isFahrenheitTemperature',
            type: 'confirm',
            message: 'Transform to Fahrenheit (default Celsius):',
            default: false,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter yes or no.';
            },
        },
    ]);
}
exports.temperatureFormat = temperatureFormat;
function confirmLocation(location) {
    return inquirer.prompt([
        {
            name: 'city',
            type: 'confirm',
            message: `Are you now in ${location}:`,
            default: true,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter tes or no.';
            },
        },
    ]);
}
exports.confirmLocation = confirmLocation;
function exit() {
    return inquirer.prompt([
        {
            name: 'options',
            type: 'confirm',
            message: 'Continue?',
            default: true,
            validate(value) {
                if (value.length) {
                    return true;
                }
                return 'Enter yes or no.';
            },
        },
    ]);
}
exports.exit = exit;
//# sourceMappingURL=inquirerService.js.map