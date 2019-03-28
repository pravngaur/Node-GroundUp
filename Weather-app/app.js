const serviceHelper = require("./mapBoxService");

const getWeatherService = (address) => {
  
  if (address) {
    return serviceHelper(address);
  }
}

module.exports = getWeatherService;