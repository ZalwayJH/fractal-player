function maximizeWindow(maximize) {
  app.api.send(maximize);
}
function minimizeWindow(minimize) {
  app.api.send(minimize);
}
function closeWindow(close) {
  app.api.send(close);
}
async function openFileFromDirectory() {
  try {
    const result = await app.api.invoke('dialog:openFile');
    return result;
  } catch (error) {
    console.error('error in api file while opening file', error);
    //if error we return an empty array incase of error
    return [];
  }
}
async function writeFileMetaData(filePath, file) {
  try {
    const result = await app.api.invoke('write:metadata', filePath, file);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function readFile() {
  try {
    const result = await app.api.invoke('read:file');
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  openFileFromDirectory,
  writeFileMetaData,
  readFile
};
