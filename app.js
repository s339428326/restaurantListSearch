//include express
const express = require("express");
const app = express();

//express handlebars
const exphbs = require("express-handlebars");

//define sever related variable
const port = 3000;

//import path for static router
const path = require("path");
const restaurantList = require("./restaurant.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static(path.join(__dirname, "public")));

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

//show routes
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.filter(
    (item) => item.id === Number(req.params.id)
  );
  res.render("show", { restaurant: restaurant[0] });
});

//search
app.get("/search", (req, res) => {
  const keyWord = req.query.keyword.trim().toUpperCase();
  const restaurant = restaurantList.results.filter((item) => {
    return (
      item.name.toUpperCase().includes(keyWord) ||
      item.category.toUpperCase().includes(keyWord)
    );
  });
  res.render("index", { restaurants: restaurant });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
