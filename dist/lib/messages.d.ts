export declare const messages: {
    welcome(): void;
    /**
     * Return a nice answer to the user related to the city requested
     * @param {string} city The city found related to the user input
     * @param {string} country The country where the city was found
     * @param {number} temp Temperature as celsius
     * @param {boolean} tempFormat Convert to Fahrenheit ?
     * @param {number} humidity A number that shows the % of humidity
     * @param {string} description Description of the weather condition
     */
    returnTemp(city: any, country: any, temp: any, tempFormat: any, humidity: any, description: any): void;
    fileFormat(): void;
    pressKey(): void;
    errorHandler(): void;
    errorMaxReached(): void;
    errorNoAPI(): void;
};
