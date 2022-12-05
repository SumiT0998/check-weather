const express =require("express");
const https=require("https");
const app= express();
const bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

  const city=req.body.cityName
  const apikey="152dbabf9ed80078f76bb4598e6acfda"
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit
  https.get(url,function(response){
        console.log(response.statusCode);

  response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    const temp=weatherdata.main.temp
    const feels=weatherdata.weather[0].description
    const icon= weatherdata.weather[0].icon
    const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>The Temprature of " +city +" is " +temp+ " degree celius</h1>");
    res.write("<p> it feels like a "+ feels +"<p>");
    res.write("<img src="+imgurl+">");
    res.send();
  })
  });

})



app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000....");
})
