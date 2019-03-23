const request = require("request");

// options object
const options = {
    url: 'https://api.darksky.net/forecast/9c329290c4e92948258ce1e2c24133f6/37.8267,-122.4233?lang=en',
    json: true
}

  // Callback handler
  const callbackHandler = function (error, response, body) {
     
    if(error){
        console.log('error:', error);
    }else if(response && response.statusCode && response.statusCode === 200 && body){
       console.log(body.currently.summary);
        console.log("Current weather conditions are: ");
       console.log("the current temperature is : " + body.currently.temperature + ", and there are" + body.currently.precipProbability + " percent chances of rain");
    }
  }

  //parsing the response
  const parseResponse = (body)=>{
    if(body){
        const jsonObj = JSON.parse(body);
        return jsonObj.currently;
    }
  }

  request(options, callbackHandler);