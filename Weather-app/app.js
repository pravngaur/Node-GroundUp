const serviceHelper = require("./mapBoxService");

const address = process.argv[2];
if(address){
  serviceHelper(address);
}
