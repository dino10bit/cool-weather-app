import got from 'got';
import * as cli from 'clui';
import Bottleneck from 'bottleneck';
import { IWeatherResponse } from './interfaces';

export const MAX_AMOUNT_OF_CITIES = 10;
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchByCityName(city: string): Promise<IWeatherResponse> {
  const rateLimiter = getRateLimiter();
  const spinnerStatus = new cli.Spinner(`Fetching weather for city: ${city}...`);
  spinnerStatus.start();

  try {
    const weatherUrl = `${OPEN_WEATHER_API_URL}?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const response = await rateLimiter.schedule(() => got(weatherUrl));
    spinnerStatus.stop();

    return JSON.parse(response.body);
  } catch (error) {
    spinnerStatus.stop();
  }
}
export async function fetchByCityNames(cities: string[]): Promise<IWeatherResponse[] | boolean> {
  return (cities.length <= MAX_AMOUNT_OF_CITIES)
    ? Promise.all(cities.map((city: string) => fetchByCityName(city)))
    : false;
}

function getRateLimiter() {
  return new Bottleneck({
    reservoir: 40,
    reservoirIncreaseAmount: 2,
    reservoirIncreaseInterval: 1000,
    reservoirIncreaseMaximum: 40,
    maxConcurrent: 5,
    minTime: 250,
  });
}

