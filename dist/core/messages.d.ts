export declare const messages: {
    noConfigExist(): void;
    errorEnvApiKeyNotFound(): void;
    welcome(): void;
    locationNotFound(): void;
    noWeatherData(location: string): void;
    showWeather(city: string, country: string, humidity: number, temperature: number, description: string, isFahrenheitTemperature: boolean): void;
    errorHandler(): void;
    fileNotExist(filePath: string): void;
    pressKeyToContinue(): void;
    fileFormat(): void;
    errorMaxCitiesReached(amountOfCities: number): void;
    dataFormatNotCorrect(fileName: string): void;
};
