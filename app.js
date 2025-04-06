require("dotenv").config();

const express = require("express");
const path = require("path");
const uuid = require("uuid");
const { getProjectByWriteId, getProjectByReadId } = require("./utils");

const PORT = process.env.PORT ?? 3232;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects/:id", async (req, res) => {
  // Param validation
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    res.sendStatus(400);
    return;
  }

  // Project query
  let project = await getProjectByReadId(id);
  if (!project) {
    project = await getProjectByWriteId(id);
    if (!project) {
      res.sendStatus(401);
      return;
    }
  }
  // Rendering
  res.render("project_main", { name: project.name, buttons: project.buttons });
});

app.get("/projects/:id/:pageId", async (req, res) => {
  // Param validation
  const { id, pageId } = req.params;
  if (!id || !uuid.validate(id)) {
    return res.sendStatus(400);
  }

  // Project query
  let project = await getProjectByReadId(id);
  if (!project) {
    project = await getProjectByWriteId(id);
    if (!project) {
      return res.sendStatus(401);
    }
  }

  // Rendering
  res.render("project_page", {});
});

app.get("/edit/:writeId", async (req, res) => {
  // Param validation
  const { writeId } = req.params;
  if (!writeId || !uuid.validate(writeId)) {
    res.sendStatus(400);
    return;
  }

  // Project query
  const project = await getProjectByWriteId(writeId);

  if (!project) {
    res.sendStatus(401);
    return;
  }

  // Rendering
  res.render("editor", {
    name: project.name,
    buttons: project.buttons,
    components: project.components,
  });
});

app.use("/404", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }

  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  res.type("txt").send("Not found");
});

// Default endpoint if the request wasn't caught before
app.use((req, res) => {
  res.redirect("/404");
});

app.listen(PORT, () => {
  console.log(`random uuid ${uuid.v4()}`);
  console.log(`Server is running on http://localhost:${PORT}/`);
});
