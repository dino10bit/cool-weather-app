import { IWeatherResponse } from './interfaces';
export declare const MAX_AMOUNT_OF_CITIES = 10;
export declare function fetchByCityName(city: string): Promise<IWeatherResponse>;
export declare function fetchByCityNames(cities: string[]): Promise<IWeatherResponse[] | boolean>;
