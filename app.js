const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const items = ["Do More Work", "With This", "To-Do-List"];

const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
 const day = date();

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.listInput;
  const currentPage = req.body.list;
  if (currentPage === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
   res.render("about");
})
// app.post("/work", function (req, res) {
//    let item = req.body.listInput;
//    workItems.push(item);
//    res.redirect("/work");
// })

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

// const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//    var today = new Date();

//    var day = "";

//  if (today.getDay() >= 0){
//    day = weekday[today.getDay()];

//  }else{
//    day = weekday[today.getDay()];

//  }
//  res.render("list", {kindOfDay: day});
