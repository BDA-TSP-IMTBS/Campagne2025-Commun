const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

function BDD() {
}

BDD.prototype = {
    constructor: BDD,

    createProject: async function (readId, writeId, name) {
        try {
            await prisma.project.create({
                data: {
                    name: name,
                    read_id: readId,
                    write_id: writeId,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    getProjectByReadId: async function (readId) {
        const res = await prisma.project.findUnique({
            where: {read_id: readId},
        });
        return res;
    },

    getProjectByWriteId: async function (writeId) {
        const res = await prisma.project.findUnique({
            where: {write_id: writeId},
        });
        return res;
    },

    createButton: async function (projectId, name, link) {
        try {
            await prisma.button.create({
                data: {
                    projectId: projectId,
                    name: name,
                    link: link,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    deleteButton: async function (buttonId) {
        try {
            await prisma.button.delete({
                where: {
                    id: buttonId,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    createComponent: async function (projectId, pageId, index, data) {
        try {
            await prisma.object.create({
                data: {
                    projectId: projectId,
                    buttonId: pageId,
                    index: index,
                    data: data,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    deleteComponent: async function (objectId) {
        try {
            await prisma.object.delete({
                where: {
                    id: objectId,
                },
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    getComponents: async function (projectId) {
        try {
            return prisma.object.findMany({where: {projectId: projectId}});
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    getButtons: async function (projectId) {
        try {
            return prisma.button.findMany({where: {projectId: projectId}});
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    getButtonById: async function (buttonId) {
        try {
            return prisma.button.findUnique({where: {id: buttonId}});
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    getComponentLastIndex: async function (projectId) {
        try {
            return 0;
            return prisma.object.findUnique({
                where: {projectId},
                orderBy: {index: {sort: "desc", nulls: "last"}},
                take: 1
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};

module.exports = new BDD();
