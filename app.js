require("dotenv").config();
const express = require("express");
const path = require("path");
const bdd = require('./BDD');

const PORT = process.env.PORT ?? 3232;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/projet", (req, res) => {
  res.render("pages/projet");
});

app.get("/treso", (req, res) => {
  res.render("pages/treso");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
