const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmFpYmhhdmQ5IiwiYSI6ImNrZzBxd3JjeDBma3UydW8yNm5kNjIzb3oifQ.LnwTWttWhyLPcs7VwnpB7Q`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, try again.");
    } else {
      callback(undefined, {
        long: response.body.features[0].center[1],
        lat: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
