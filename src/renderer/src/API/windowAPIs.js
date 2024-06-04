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
async function fileMetaData(filePath) {
  try {
    const result = await app.api.invoke('get:metaData', filePath);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function callFs(channel, filePath, data) {
  try {
    const result = await app.api.invoke(channel, filePath, data);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { closeWindow, minimizeWindow, maximizeWindow, openFileFromDirectory, fileMetaData, callFs };
