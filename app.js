const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extented: true}));


app.get("/", function(req, resonse){

    resonse.sendFile(__dirname + "/index.html");
    

});

app.post("/", function(req, response){
    
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const apikey="45e2fcfa6066b207639a355daa1b271b";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric";

    https.get(url, function(res){
        console.log(res.statusCode);

        res.on("data", function(data){
             const wheatherData=JSON.parse(data)
             const temp=wheatherData.main.temp;
             const desp=wheatherData.weather[0].description;
             console.log(desp);
            const icon=wheatherData.weather[0].icon;
            const url1="https://openweathermap.org/img/wn/"+ icon+"@2x.png"
             response.write("<h1>The temperature in"+ query + "is " + temp + " degrees celcius</h1>");
             response.write("<p>weather description of bengaluru: "+ desp+"</p>");
             response.write("<img src="+url1+">");
             response.send();
        })
    })
})




app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


// app.get("/", function(req, resonse){
//     const url="https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=45e2fcfa6066b207639a355daa1b271b&units=metric";

//     https.get(url, function(res){
//         console.log(res.statusCode);

//         res.on("data", function(data){
//              const wheatherData=JSON.parse(data)
//              const temp=wheatherData.main.temp;
//              const desp=wheatherData.weather[0].description;
//              console.log(desp);
//             const icon=wheatherData.weather[0].icon;
//             const url="https://openweathermap.org/img/wn/"+ icon+"@2x.png"
//              resonse.write("<h1>The temperature in Bengaluru is " + temp + " degrees celcius</h1>");
//              resonse.write("<p>weather description of bengaluru: "+ desp+"</p>");
//              resonse.write("<img src="+url+">");
//              resonse.send();
//         })
//     })

// });