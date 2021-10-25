export declare const choices: {
    WEATHER_IN_MY_LOCATION: string;
    WEATHER_IN_ANOTHER_CITY: string;
    IMPORT_LOCATIONS: string;
    PREVIOUS_CONFIG: string;
};
export declare function menu(): Promise<string>;
export declare function askCity(): Promise<{
    location: string;
    isFahrenheitTemperature: boolean;
}>;
export declare function selectFile(): Promise<{
    filePath: string;
    isFahrenheitTemperature: boolean;
}>;
export declare function temperatureFormat(): Promise<{
    isFahrenheitTemperature: boolean;
}>;
export declare function confirmLocation(location: string): Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export declare function exit(): Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
