
const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const items = ["Item1", "Item2"];
const workItems = [];
// mostly use let and const instaed of var

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date.getDate(); // let day = date.getDay();
  res.render("list", {ListTitle : day, newAddItems : items});
});

app.post("/",function(req,res){
  let item = req.body.newItem;

  if(req.body.listButton == "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list", {ListTitle : " Work List", newAddItems : workItems});
});

app.post("/work",function(req,res){
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
})

app.listen(3000, function() {
  console.log("server running at 3000 port");
});
