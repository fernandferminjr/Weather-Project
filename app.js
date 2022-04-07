const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res){


  //api url
  const query = req.body.cityName;
  const apiKey = "8e7bb9ad0f6b7605e674747acd6d4ce4";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ apiKey + "";

  //fetch data from api
  https.get(url, function(response){
    console.log(response.statusCode);

    //response on fetch data
    response.on("data", function(data){
        //convert data to JSON object
        const weatherData = JSON.parse(data);
        //select specific data
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        //Can send only once in response.app.get
        res.write("<p>The weather is currently " + weatherDescription + "<p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degress Celcius</h1>");
        res.write("<img src=" + imageUrl +">");
        res.send();
    })
  });
})


app.listen(3000, function (){
  console.log("Server is running on port 3000.")
})
