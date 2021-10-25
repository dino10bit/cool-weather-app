interface IConfig {
    city: string;
    isFahrenheitTemperature: boolean;
}
export declare function getConfig(): IConfig | undefined;
export declare function setConfig(city: string, isFahrenheitTemperature: boolean): void;
export declare function saveConfig(): void;
export declare function checkEnvVariables(): boolean;
export {};
