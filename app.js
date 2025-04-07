require("dotenv").config();

const express = require("express");
const path = require("path");

const PORT = process.env.PORT ?? 3232;
const app = express();

const baseRouter = require("./routers/base_router");
const apiRouter = require("./routers/api_router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use("/", baseRouter);
app.use("/", apiRouter);

// Default endpoint if the request wasn't caught before
app.use((req, res) => {
    res.redirect("/404");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
