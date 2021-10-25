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

##Questions:

###About the app:
- If you should deliver this application to users, what should you do? (api etc.)
1. Make package publicly available on http://npmjs.com
2. Write some article about this app for example on: http://medium.com.
3. Record video on how to use this app and deploy it on http://youtube.com
4. Make sure that code is well tested.
5. Try to find small group of people to play with app first and take notes from them.
6. If this app need to be used by everyone then it's better to create desktop app 
by using for example Flutter which will use this cli-app at the background.

- What could be done to improve the application?
1. Check if city name is existing city on the planet and show the message to the user if city is not exist.
2. Autocomplete when selecting country and city.
3. Option to show search history.
4. Allow importing different file formats(xml, yaml, etc.)
5. Show weather picture from satellite.
6. Support of faster api's for fetching weather data.
7. Adding caching.
8. Import large data sets by batches.
9. When importing the file, add data validation in batches
10. Create AWS lambda functions with API from the cli app and upload it to the AWS cloud.
In this way app will be accessed by web and be scalable.  

###About the dev process:
- Why did you use these packages? (How did you choose the packages, why
and how you decide to add /select a package.)

I choose npm package based on:
1. Functional
2. Package is well tested
3. Having good code quality
4. Little dependencies if possible
5. Good rate on npmjs.com/github (amount of downloads, stars, PR's, issues)
6. Last commit is not from far ago
7. Documentation
8. No dependency vulnerability
9. Fewer bugs as possible
10. I prefer packages written in TypeScript
11. Execution time

