const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workIteams = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {listTitle: day, newItemsList: items});
});

app.post("/", function(req, res) {
  if(req.body.list=="Work") {
    workIteams.push(req.body.newItem);
    res.redirect("/work");
  } 
  else {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newItemsList: workIteams});
});

app.get("/about", function(req,res) {
  res.render("about");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});