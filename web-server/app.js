const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.status(200).render("index", { message: "This is the home page" });
});

app.get("/index.html", (req, res) => {
  res.status(200).render("index", { message: "This is the home page" });
});

app.get("/about.html", (req, res) => {
  res.status(200).render("index", { message: "This is the about page" });
});

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
