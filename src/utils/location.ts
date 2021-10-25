import got from 'got';
import * as cli from 'clui';
import { messages } from '../core/messages';

export interface ILocation {
    status: string,
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    zip: string,
    lat: number,
    lon: number,
    timezone: string,
    isp: string,
    org: string,
    as: string,
    query: string
}

export async function findLocation(): Promise<ILocation> {
  const spinnerStatus = new cli.Spinner('Checking location. Please wait...'); // TODO: replace with https://github.com/oclif/oclif
  spinnerStatus.start();

  try {
    const response = await got('http://ip-api.com/json');
    spinnerStatus.stop();
    return JSON.parse(response.body);
  } catch (error) {
    spinnerStatus.stop();
    messages.locationNotFound();
  }
}
