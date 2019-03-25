const request = require("request");

/**
 * dark sky API call
 */
// options object


  let options = {
    url: 'https://api.darksky.net/forecast/9c329290c4e92948258ce1e2c24133f6/37.8267,-122.4233?lang=en',
    json: true
  };

  const callbackHandler = function (error, response, body) {

    if (error) {
      console.log('error:', error);
    } else if (response && response.statusCode && response.statusCode === 200 && body) {
      console.log("********* Weather Information ***********" );
      console.log("Current weather conditions are: ", (body.currently.summary).toUpperCase());
      console.log("The current temperature is : " + body.currently.temperature + ", and there are " + body.currently.precipProbability + " percent chances of rain");
      console.log("********* Weather Information ***********" );
    }
  };

  const callDarkSkyAPI = function (lattLongObject) {
    
    if(lattLongObject){
      let urlString = "https://api.darksky.net/forecast/9c329290c4e92948258ce1e2c24133f6/" + lattLongObject.latt + "," +
      lattLongObject.long + "?lang=en";
      options.url = urlString;
      const requestBody = request(options, callbackHandler);
    }
    
  }

module.exports = callDarkSkyAPI;