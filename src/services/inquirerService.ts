import * as path from 'path';
import * as inquirer from 'inquirer';
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

export const choices = {
  WEATHER_IN_MY_LOCATION: 'Weather in my location',
  WEATHER_IN_ANOTHER_CITY: 'Weather in another city',
  IMPORT_LOCATIONS: 'Import locations',
  PREVIOUS_CONFIG: 'Previous configuration',
};

export async function menu() {
  const response: { options: string } = await inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      message: 'Please make a choice:',
      choices: Object.values(choices),
      default: 'Check the weather of a city',
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Choose an option';
      },
    },
  ]);

  return response.options;
}

export function askCity(): Promise<{ location: string, isFahrenheitTemperature: boolean }> {
  return inquirer.prompt([
    {
      name: 'location',
      type: 'input',
      message: 'Provide city name or (zip code, country code):',
      validate(value: string) {
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
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Enter yes or no.';
      },
    },
  ]);
}

export function selectFile(): Promise<{ filePath: string, isFahrenheitTemperature: boolean }> {
  return inquirer.prompt([
    {
      name: 'filePath',
      type: 'file-tree-selection',
      message: 'Select a file:',
      root: './examples',
      validate(item: string) {
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
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Enter yes or no.';
      },
    },
  ]);
}

export function temperatureFormat(): Promise<{ isFahrenheitTemperature: boolean }> {
  return inquirer.prompt([
    {
      name: 'isFahrenheitTemperature',
      type: 'confirm',
      message: 'Transform to Fahrenheit (default Celsius):',
      default: false,
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Enter yes or no.';
      },
    },
  ]);
}

export function confirmLocation(location: string) {
  return inquirer.prompt([
    {
      name: 'city',
      type: 'confirm',
      message: `Are you now in ${location}:`,
      default: true,
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Enter tes or no.';
      },
    },
  ]);
}

export function exit() {
  return inquirer.prompt([
    {
      name: 'options',
      type: 'confirm',
      message: 'Continue?',
      default: true,
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Enter yes or no.';
      },
    },
  ]);
}
