## Weather cli app 
- weather is fetched from: [Open Weather](https://openweathermap.org/) 
- geolocation is fetched from [IP API](https://ip-api.com/)

##Demo:
see: https://www.youtube.com/watch?v=59uJFPPzT2E

### Installation:
> Note: API key to the (https://openweathermap.org) can be set in `.env` file
```
$ npm i -g ts-node
$ npm i
```
### Usage example:
Show menu prompt:
```
$ ts-node src/index.ts
```
Show help:
```
$ ts-node src/index.ts -h
```
Import list of cities from the file, with Fahrenheit temperature scale:
```
$ ts-node src/index.ts --import ./examples/cities.json -t f
```
Fetch weather for the zipcode 38000 (Grenoble):
```
$ ts-node src/index.ts --z 38000,fr
```
Fetch weather for Paris (default format is celsius):
```
$ ts-node src/index.ts --c Amsterdam
```
Fetch weather for Paris, format Fahrenheit :
```
$ ts-node src/index.ts --c Amsterdam --t f
```
Fetch weather for the latest query:
```
$ ts-node src/index.ts -l
```
