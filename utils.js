export async function getProjectByReadId(readId) {
  // TODO: put some real code in there
  return await getProjectByWriteId(readId);
}

export async function getProjectByWriteId(writeId) {
  // TODO: put some real code in there
  return {
    name: "Dindon",
    buttons: [{ projectId: writeId, name: "caca", link: "caca" }],
    components: [],
  };
}
