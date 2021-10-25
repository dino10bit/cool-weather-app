'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) {
    k2 = k;
  }
  Object.defineProperty(o, k2, { enumerable: true, get() {
    return m[k];
  } });
}) : (function(o, m, k, k2) {
  if (k2 === undefined) {
    k2 = k;
  }
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function(o, v) {
  o['default'] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) {
    return mod;
  }
  var result = {};
  if (mod != null) {
    for (var k in mod) {
      if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) {
        __createBinding(result, mod, k);
      }
    }
  }
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Inquirer = void 0;
const path = __importStar(require('path'));
const inquirer = __importStar(require('inquirer'));
const inquirer_file_tree_selection_prompt_1 = __importDefault(require('inquirer-file-tree-selection-prompt'));
inquirer.registerPrompt('file-tree-selection', inquirer_file_tree_selection_prompt_1.default);
exports.Inquirer = {
  checkOptions() {
    const menu = [
      {
        name: 'options',
        type: 'list',
        message: 'What would you like to do:',
        choices: [ 'Check my weather location', 'Search for a specific city', 'Check my previous configuration', 'Import a file of locations ...' ],
        default: 'Check the weather of a city',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter choose one option';
        },
      },
    ];
    return inquirer.prompt(menu);
  },
  askCity() {
    const openingQuestion = [
      {
        name: 'location',
        type: 'input',
        message: 'Get the temperature from [<city> or <zip code, country code>]:',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter a city or a zip code.';
        },
      },
      {
        name: 'temp',
        type: 'confirm',
        message: 'Convert into Fahrenheit (default Celsius):',
        default: false,
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter Yes or No.';
        },
      },
    ];
    return inquirer.prompt(openingQuestion);
  },
  confirmCity(city) {
    const goodCity = [
      {
        name: 'city',
        type: 'confirm',
        message: `Are you actually in ${city}:`,
        default: true,
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter Yes or No.';
        },
      },
    ];
    return inquirer.prompt(goodCity);
  },
  tempFormat() {
    const format = [
      {
        name: 'temp',
        type: 'confirm',
        message: 'Convert into Fahrenheit (default Celsius):',
        default: false,
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter Yes or No.';
        },
      },
    ];
    return inquirer.prompt(format);
  },
  getFile() {
    const fileDir = [
      {
        name: 'file',
        type: 'file-tree-selection',
        // type: 'fconfirm',
        message: 'Choose a file (only JSON file in your Assets directory)',
        // root: homedir,
        root: './examples',
        validate(item) {
          if (path.extname(item) === '.json') {
            return true;
          }
          return 'Please select a JSON file !';
        },
      },
      {
        name: 'temp',
        type: 'confirm',
        message: 'Convert into Fahrenheit (default Celsius):',
        default: false,
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter Yes or No.';
        },
      },
    ];
    return inquirer.prompt(fileDir);
  },
  exit() {
    const quit = [
      {
        name: 'options',
        type: 'confirm',
        message: 'Would you like to continue:',
        default: true,
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter Yes or No.';
        },
      },
    ];
    return inquirer.prompt(quit);
  },
};
