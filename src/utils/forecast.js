const request = require("request");

const forecast = (long, lat, callback) => {
  const API_KEY = "010fe7fca91f1caa9965e1a2efdeab21";
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${long},${lat}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the internet!");
    } else if (response.body.error) {
      callback("Please check your input and try again.");
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        humidity: response.body.current.humidity,
        feelslike: response.body.current.feelslike,
        weatherDescription: response.body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
