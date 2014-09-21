heat-index
==========

a utility module for the heat index calculation by temerature and relative humidity.

## usage
```js
var HI = require('heat-index');

// in Celsius
HI.heatIndex({temperature: 32, humidity: 65});

// in Fahrenheit
HI.heatIndex({temperature: 87, humidity: 65, fahrenheit: true});

// utilities
HI.toCelsius(30);
HI.toFahrenheit(86);
```

## install
```
npm install heat-index
```
