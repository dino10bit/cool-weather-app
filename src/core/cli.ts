import * as fs from 'fs';
import { inquirerService, weatherService, configService } from '../services';
import { messages } from './messages';
import { options } from './options';
import { findLocation } from '../utils/location';
import { IWeatherResponse } from '../services/interfaces';

export const run = async () => {
  const { city, temperature, importFile, last } = options;

  if (city) {
    await showWeatherByAnotherCity(city, temperature === 'f');
    return;
  }

  if (importFile) {
    await showWeatherByImportedLocations(importFile, temperature === 'f');
    return;
  }

  if (last) {
    await showWeatherByPreviousConfig();
    return;
  }

  // If no command options is given then show prompt menu:
  await showMenuPrompt();
  const exit = await inquirerService.exit();

  if (exit.options) {
    await run();
  }
};

async function showMenuPrompt() {
  const cliMenuSelectedOption = await inquirerService.menu();
  const choices = inquirerService.choices;

  switch (cliMenuSelectedOption) {
    case choices.WEATHER_IN_MY_LOCATION: { await showWeatherByMyLocation(); break; }
    case choices.IMPORT_LOCATIONS: { await showWeatherByImportedLocations(); break; }
    case choices.WEATHER_IN_ANOTHER_CITY: { await showWeatherByAnotherCity(); break; }
    case choices.PREVIOUS_CONFIG: { await showWeatherByPreviousConfig(); break; }
  }

  configService.saveConfig();
}

async function showWeatherByMyLocation(): Promise<void> {
  const { city, countryCode } = await findLocation();

  if (city && countryCode) {
    const { city: cityConfirmed } = await inquirerService.confirmLocation(city);

    if (cityConfirmed) {
      const { isFahrenheitTemperature } = await inquirerService.temperatureFormat();
      const location = `${city}, ${countryCode}`;
      const weatherResponse = await weatherService.fetchByCityName(location);

      if (!weatherResponse || !weatherResponse.name) {
        messages.noWeatherData(location);
        return;
      }

      showWeather(weatherResponse, isFahrenheitTemperature);
      configService.setConfig(city, isFahrenheitTemperature);
    }
  }
}

async function showWeatherByPreviousConfig(): Promise<void> {
  const config = configService.getConfig();

  if (config === undefined) {
    messages.noConfigExist();
    return;
  }

  const weatherResponse = await weatherService.fetchByCityName(config.city);

  if (!weatherResponse || !weatherResponse.name) {
    messages.noWeatherData(config.city);
    return;
  }

  const { isFahrenheitTemperature } = configService.getConfig();
  showWeather(weatherResponse, isFahrenheitTemperature);
}

async function showWeatherByAnotherCity(location?: string, isFahrenheitTemperature = false): Promise<void> {
  let answer: { location: string, isFahrenheitTemperature: boolean };

  if (location) {
    answer = { location, isFahrenheitTemperature };
  } else {
    answer = await inquirerService.askCity();
  }

  const weatherResponse = await weatherService.fetchByCityName(answer.location);

  if (!weatherResponse || !weatherResponse.name) {
    messages.noWeatherData(answer.location);
    return;
  }

  configService.setConfig(weatherResponse.name, answer.isFahrenheitTemperature);
  showWeather(weatherResponse, answer.isFahrenheitTemperature);
}

async function showWeatherByImportedLocations(filePath?: string, isFahrenheitTemperature = false): Promise<void> {
  if (!filePath) {
    messages.fileFormat();
    const response = await inquirerService.selectFile();
    filePath = response.filePath;
    isFahrenheitTemperature = response.isFahrenheitTemperature;
  }

  try {
    if (!fs.existsSync(filePath)) {
      messages.fileNotExist(filePath);
      return;
    }

    const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    const { cities } = JSON.parse(data);

    if (!cities || cities.length === 0) {
      messages.dataFormatNotCorrect(filePath);
      return;
    }

    weatherService.fetchByCityNames(cities)
      .then((response: IWeatherResponse[]) => {
        if (response) {
          response.map((data: IWeatherResponse) =>
            showWeather(data, isFahrenheitTemperature),
          );
        } else {
          messages.errorMaxCitiesReached(cities.length);
        }

        messages.pressKeyToContinue();
      });
  } catch (error) {
    return messages.errorHandler();
  }
}

function showWeather(weatherResponse:IWeatherResponse, isFahrenheitTemperature: boolean): void {
  messages.showWeather(
    weatherResponse.name,
    weatherResponse.sys.country,
    weatherResponse.main.humidity,
    weatherResponse.main.temp,
    weatherResponse.weather[0].description,
    isFahrenheitTemperature,
  );
}
