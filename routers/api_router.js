const express = require('express');
const uuid = require("uuid");
const bdd = require("../BDD");
const router = express.Router();

router.post("/create", async (req, res) => {
    const {name} = req.body;
    if (!name || typeof name !== "string" || name.length > 50) {
        return res.sendStatus(400);
    }

    const readUUID = uuid.v4();
    const writeUUID = uuid.v4();
    const success = await bdd.createProject(readUUID, writeUUID, name);

    if (!success) {
        return res.sendStatus(500);
    }

    console.log(`Created project with: ${readUUID}, ${writeUUID}`);

    res.redirect(`/projects/${writeUUID}`);
});

router.post("/create_button", async (req, res) => {
    const {name, writeId} = req.body;
    if (
        !name ||
        typeof name !== "string" ||
        name.length > 20 ||
        !writeId ||
        !uuid.validate(writeId)
    ) {
        return res.sendStatus(400);
    }

    const project = await bdd.getProjectByWriteId(writeId);

    if (!project) {
        return res.sendStatus(401);
    }

    const success = await bdd.createButton(project.id, name, "");

    if (!success) {
        return res.sendStatus(500);
    }

    res.redirect(`/projects/${writeId}`);
});

router.post("/delete_button", async (req, res) => {
    const {buttonId, writeId} = req.body;

    if (
        !buttonId ||
        !writeId ||
        isNaN(parseInt(buttonId)) ||
        !uuid.validate(writeId)
    ) {
        return res.sendStatus(400);
    }

    const project = await bdd.getProjectByWriteId(writeId);

    if (!project) {
        return res.sendStatus(401);
    }

    const success = await bdd.deleteButton(parseInt(buttonId));

    if (!success) {
        return res.sendStatus(500);
    }

    res.redirect(`/projects/${writeId}`);
});

router.post("/create_component", async (req, res) => {
    const {text, link, image_link, writeId, pageId} = req.body;
    if (!writeId || !uuid.validate(writeId) || isNaN(pageId)) {
        return res.sendStatus(400);
    }

    const project = await bdd.getProjectByWriteId(writeId);

    if (!project) {
        return res.sendStatus(401);
    }

    const index = await bdd.getComponentLastIndex() ?? 0;

    const data = {};
    if (text) {
        data["type"] = "text";
    } else if (link) {
        data["type"] = "link";
    } else if (image_link) {
        data["type"] = "image";
    }

    const success = await bdd.createComponent(project.id, parseInt(pageId), index, JSON.stringify(data));

    if (!success) {
        return res.sendStatus(500);
    }

    res.redirect(`/projects/${writeId}/${pageId}`);
});

module.exports = router;
