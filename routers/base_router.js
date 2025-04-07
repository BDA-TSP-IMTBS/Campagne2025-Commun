const express = require('express');
const uuid = require("uuid");
const bdd = require("../BDD");
const router = express.Router();

const URL = process.env.URL ?? "http://127.0.0.1:3232/"

router.get("/", (req, res) => {
    res.render("pages/index");
});


router.get("/projects/:id", async (req, res) => {
    // Param validation
    const {id} = req.params;
    if (!id || !uuid.validate(id)) {
        res.sendStatus(400);
        return;
    }

    // Project query
    let project = await bdd.getProjectByReadId(id);
    let readId = id;
    let writeId = null;
    if (!project) {
        project = await bdd.getProjectByWriteId(id);
        writeId = id;
        if (!project) {
            res.sendStatus(401);
            return;
        }
        readId = project.read_id;
    }

    const buttons = await bdd.getButtons(project.id);

    // Rendering
    res.render("pages/project_main", {
        name: project.name,
        buttons,
        readId,
        writeId,
        URL,
    });
});

router.get("/projects/:id/:pageId", async (req, res) => {
    // Param validation
    const {id, pageId} = req.params;
    if (!id || !uuid.validate(id) || isNaN(parseInt(pageId))) {
        return res.sendStatus(400);
    }

    // Project query
    let project = await bdd.getProjectByReadId(id);
    let writeId = null;
    if (!project) {
        project = await bdd.getProjectByWriteId(id);
        writeId = id;
        if (!project) {
            return res.sendStatus(401);
        }
    }

    const button = await bdd.getButtonById(parseInt(pageId));

    if (!button || button.projectId !== project.id) {
        return res.sendStatus(400);
    }

    const objects = await bdd.getComponents(project.id);
    for (const object of objects) {
        object.data = JSON.parse(object.data);
        object.data["id"] = object.id;
    }

    // Rendering
    res.render("pages/project_page", {name: project.name, subname: button.name, objects, writeId, pageId});
});

router.use("/404", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.render("pages/404");
        return;
    }

    if (req.accepts("json")) {
        res.json({error: "Not found"});
        return;
    }

    res.type("txt").send("Not found");
});

module.exports = router;
