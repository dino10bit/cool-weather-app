import Config  from '../utils/config';
import * as dotenv from 'dotenv';
import path from 'path';
import { messages } from '../core/messages';

interface IConfig {
    city: string;
    isFahrenheitTemperature: boolean;
}

const filePath = path.join(__dirname, '../../config.json');
const config = new Config<IConfig>(filePath, { city: '', isFahrenheitTemperature: false });
dotenv.config();

export function getConfig(): IConfig | undefined {
  const city: string = config.get('city');
  const isFahrenheitTemperature: boolean = config.get('isFahrenheitTemperature');

  return (city !== undefined && isFahrenheitTemperature !== undefined) ? { city, isFahrenheitTemperature } : undefined;
}

export function setConfig(city: string, isFahrenheitTemperature: boolean) {
  config.set('city', city);
  config.set('isFahrenheitTemperature', isFahrenheitTemperature);
}

export function saveConfig() {
  config.save();
}

export function checkEnvVariables(): boolean {
  let success = true;

  if (process.env.OPEN_WEATHER_API_KEY) {
    messages.errorEnvApiKeyNotFound();
    success = false;
  }

  return success;
}
