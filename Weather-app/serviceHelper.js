const request = require("request");

/**
 * dark sky API call
 */
// options object

const darkSkyAPI = {
  options: {
    url: 'https://api.darksky.net/forecast/9c329290c4e92948258ce1e2c24133f6/37.8267,-122.4233?lang=en',
    json: true
  },
  callbackHandler: function (error, response, body) {

    if (error) {
      console.log('error:', error);
    } else if (response && response.statusCode && response.statusCode === 200 && body) {
      console.log("********* Weather Information ***********" );
      console.log("Current weather conditions are: ", (body.currently.summary).toUpperCase());
      console.log("The current temperature is : " + body.currently.temperature + ", and there are " + body.currently.precipProbability + " percent chances of rain");
      console.log("********* Weather Information ***********" );
    }
  },
  callDarkSkyAPI: function (lattLongObject) {
    
    if(lattLongObject){
      let urlString = "https://api.darksky.net/forecast/9c329290c4e92948258ce1e2c24133f6/" + lattLongObject.latt + "," +
      lattLongObject.long + "?lang=en";
      this.options.url = urlString;
      const requestBody = request(this.options, this.callbackHandler);
    }
    
  }
}

const mapBoxAPI = {
  arguments: {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    queryParam: '?access_token=pk.eyJ1IjoicHJhdm5nYXVyIiwiYSI6ImNqdG16eWVjdDBoMTE0NHFnMzBzb2lmdnUifQ.kBQbSHG_2Ny1YQSvIUzfkg',
    limit: "&limit=1"
  },

  callMapBoxAPIHelper: function (address, callback) {
    if (address) {
      let lattLongObject;
      let options = {
        url: this.arguments.url + address + ".json" + this.arguments.queryParam + this.arguments.limit,
        json: true
      }
      //calling the geocoding service
      lattLongObject = request(options, (error, response, body) => {
        if (error) {
          errorObject = {
            message: "network layer issue.",
            errorObj: error,
            responseObj: undefined
          }
          callback(errorObject)
        } else if (response && response.statusCode && response.statusCode !== 200) {
          errorObject = {
            message: "This is some programming level error, probably incorrect request.",
            errorObj: undefined,
            responseObj: response
          }
          callback(errorObject)
        } else if (response && response.statusCode && response.statusCode === 200 && body) { //successful request
          const returnObject = {
            latt: body.features[0].center[1],
            long: body.features[0].center[0]
          };
          
          callback(undefined, returnObject); //calling the callback in order to call the darksky API.
        }
      });
    }
  },
  callMapBoxAPI(address){
    this.callMapBoxAPIHelper(address, (error, response) =>{
      if(error){
        if(error.errorObj){
          console.log(error.errorObj.message, error.errorObj.errorObj)
        }else{
          console.log(error.errorObj.message, error.errorObj.responseObj)
        }
      }else if(response){
        console.log("********* Cordinate Information ***********" );
        console.log(response);
        console.log("********* Cordinate Information ***********" );
        darkSkyAPI.callDarkSkyAPI(response);//calling the darksky API.
      }
    })
  }
}
mapBoxAPI.callMapBoxAPI("New York");

module.exports = {
  getWeatherInformation: mapBoxAPI.callMapBoxAPI
}
