const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Buy Food","Cook Food","Eat Food"];
let workItems =[];
app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  let today = new Date();

  let options = {
  weekday: "long",
  day: "numeric",
  month : "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list",{ListTitle:day, newListItem: items});

});

app.post("/",function(req,res){
console.log(req.body);
  if (req.body.list === "work list"){
    workItems.push(req.body.newItem)
    res.redirect("/work")
  }else{
    items.push(req.body.newItem)
    res.redirect("/")
}})

app.get("/work", function(req,res){

  res.render("list",{ListTitle: "work list", newListItem: workItems});
});
app.get("/about",function(req,res){

  res.render("about");
})


app.listen(process.env.PORT|| 3000,function(){
  console.log("server is up and running");
})
