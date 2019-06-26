require("dotenv").config(); //LOADS ALL .env variables
var express=require("express"),
    app=express(),
    todoRoutes=require('./routes/todos'),
    bodyParser=require("body-parser");
    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));

app.use("/api/todos",todoRoutes);

app.get("/",function(req,res){
    res.sendFile("index.html");
});

app.listen(process.env.PORT,function(){
    console.log("Server Started");
})