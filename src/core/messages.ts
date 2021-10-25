import clear from 'clear';
import chalk from 'chalk';
import { get } from 'node-emoji';
import { MAX_AMOUNT_OF_CITIES } from '../services/weatherService';

const emoji = (type: string) => get(type);

export const messages = {
  noConfigExist() {
    console.log(
      `${chalk.redBright('Error: There is no stored configuration yet.')}`,
    );
  },
  errorEnvApiKeyNotFound() {
    console.log(
      `${chalk.redBright('Error: Environment variable OPEN_WEATHER_API_KEY is not set, see README file.')}`,
    );
  },
  welcome() {
    clear();
    console.log(chalk.green(`Weather cli ${emoji(':partly_sunny:')}.`));
  },
  locationNotFound() {
    console.log(
      `${chalk.redBright('Error: Location not found!')}`,
    );
  },
  noWeatherData(location: string) {
    console.log(
      `${chalk.redBright(`Error: We don't have information about weather for the city: ${location}`)}`,
    );
  },
  showWeather(
    city: string,
    country: string,
    humidity: number,
    temperature: number,
    description: string,
    isFahrenheitTemperature: boolean,
  ) {
    const temperatureFormatted = isFahrenheitTemperature
      ? `${(temperature * 9 / 5 + 32).toFixed(2)} °F`
      : `${temperature} C°`;
    console.log(
      `City: ${chalk.yellow(`${city}, ${country}`)} 
             Temperature: ${chalk.green(temperatureFormatted)} 
             Humidity: ${chalk.green(`${humidity}%`)} 
             Description: ${chalk.green(addEmojiToDescription(description))}`,
    );
  },
  errorHandler() {
    console.log(
      `${chalk.redBright('Error: Can\'t find the requested city. Please try another city.')}`,
    );
  },
  fileNotExist(filePath: string) {
    console.log(
      `${chalk.redBright('Error: File is not exist at the given path:')}
             ${chalk.yellow(filePath)}`,
    );
  },
  pressKeyToContinue() {
    console.log(chalk.yellow('Press any key to continue'));
  },
  fileFormat() {
    console.log(
      `${chalk.redBright('Format accepted:')} ${chalk.greenBright('{ "cities": ["Madrid", "Berlin" ...] }')} 
            \n${chalk.yellow(`Max ${MAX_AMOUNT_OF_CITIES} cities accepted.`)}`);
  },
  errorMaxCitiesReached(amountOfCities: number) {
    console.log(
      `${chalk.redBright(`Error: You requested more then maximum (${MAX_AMOUNT_OF_CITIES}) amount of cities: ${amountOfCities}.`)}`,
    );
  },
  dataFormatNotCorrect(fileName: string) {
    console.log(
      `${chalk.redBright(`Error: data format is not correct in the file: ${fileName}`)}`,
    );
    messages.fileFormat();
  },
};

function addEmojiToDescription(description: string) {
  switch (description) {
    case 'broken clouds': description += emoji(':mostly_sunny:'); break;
    case 'clear sky': description += emoji(':sun_with_face:'); break;
    case 'thunderstorm with light rain': description += emoji(':lightning_cloud:'); break;
    case 'overcast clouds': description += emoji(':partly_sunny:'); break;
    case 'scattered clouds': description += emoji(':partly_sunny:'); break;
  }

  return description + ' ';
}
