require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT ?? 3232;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
