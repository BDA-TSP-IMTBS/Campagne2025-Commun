const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function BDD() {}

BDD.prototype = {
	constructor : BDD,

	createProject : async function(readId, writeId, name) {
		try {
			await prisma.project.create({
				data: {
					name: name,
					read_id: readId,
					write_id: writeId,
				}
			});
			return true;
		}
		catch(err) {
			return false;
		}
	},

	getProjectByReadId : async function(readId) {
		const res = await prisma.project.findMany({
			where: { read_id: readId }
		});
		if(res.length != 0) {
			return res;
		}
		return null;
	},

	getProjectByWriteId : async function(writeId) {
                const res = await prisma.project.findMany({
                        where: { write_id: writeId }
                });
                if(res.length != 0) {      
                        return res;
                }
                return null;
        },

	createButton : async function(projectId, name, link) {
                try {
                        await prisma.button.create({
                                data: {
					projectId: projectId,
                                        name: name,
                                        link: link
                                }
                        });
                        return true;
                }
                catch(err) {
                        return false;
                }
        },

	deleteButton : async function(buttonId) {
		try {
			await prisma.button.delete({
				where: {
					id: buttonId
				}
			});
			return true;
		}
		catch(err) {
			return false;
		}
	},

	createComponent : async function(projectId, pageId, index, data) {
                try {
                        await prisma.object.create({
                                data: {
                                        projectId: projectId,
					buttonId: pageId,
                                        index: index,
                                        data: data
                                }
                        });
                        return true;
                }
                catch(err) {
                        return false;
                }
        },

	deleteComponent : async function(objectId) {
                try {
                        await prisma.object.delete({
                                where: {
                                        id: objectId
                                }
                        });
                        return true;
                }       
                catch(err) {
                        return false;
                }       
        }
};

module.exports = new BDD();
