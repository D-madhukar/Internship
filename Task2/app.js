var path=require("path");
var express=require("express");
var bodyparser=require("body-parser")
var urlencodedparser=bodyparser.urlencoded({extended:false});
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var app=express();
mongoose.connect("mongodb://localhost/rauzr");
mongoose.connection.once("open",function(){
    console.log("connection is made")
;}).on("error",function(error){
    console.log("connection error",error);
});
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
const cart=new Schema({
    name:{type:String,required:true,trim:1},
    itemname:{type:String,required:true,trim:1},
    price:{type:Number,trim:1},
    quantity:{type:String,required:true,trim:1}
});
const mod=mongoose.model("cart",cart);
app.post('/process',urlencodedparser,function(req,res){
    console.log("**");
    var item=new mod({
        name:req.body.name,
        itemname:req.body.itemname,
        price:req.body.price,
        quantity:req.body.quantity
    });
    item.save(function(error){
        if(error){
            res.status(500).send("failed to send data"+error);
        }
        else{
            res.redirect('/');
        }
    });
    // var temp;

});

// app.get("/process",function(req,res){
//     console.log("dvsdbv");
// })

app.get("/find",function(req,res){
    mod.find({}).then(function(rest){
        res.render("index",{result:rest});
    });
    
});
app.get("/",function(req,res){
    mod.find({}).then(function(rest){
        res.render("index",{result:rest});
    });
    
});
app.listen(15913);
