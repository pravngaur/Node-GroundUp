// Loading native modules
const path = require("path");

//Loading NPM modules
const express = require("express");
const hbs = require("hbs");

// Initializing express
const app = express();

// building the directory paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//Setting the path of the static public directoory
app.use(express.static(viewsDirectoryPath));

// Setting the handlebar properties
app.set('view engine', 'hbs');
app.set("views", viewsDirectoryPath);

// Configuring handlebars to register the partials
hbs.registerPartials(partialsDirectoryPath);

//defining the routes
app.get("/", (req, res)=>{
    res.render("index",{
        place: "Bangalore",
        forecast: "Clear weather all day.",
        rain: false
    });
})

app.get("/weather",(req, res)=>{
    
    const pageTitle = "<H1>Weather Information Page</H1>&nbsp;";
    const jsonObject = {
        place: "Bangalore",
        forecast: "Clear weather all day.",
        rain: false
    }
    res.send(pageTitle + JSON.stringify(jsonObject));
});

app.get("*",(req, res)=>{
    res.render("404")
});

app.listen(3000,()=>{
    console.log("Server started!!");
});