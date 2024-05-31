function maximizeWindow() {
  app.window.maximize();
}
function minimizeWindow() {
  app.window.minimize();
}
function closeWindow() {
  app.window.close();
}
async function openFileFromDirectory() {
  try {
    const result = await app.window.openFile();
    //should return an array of file paths that the user selected or an empty array if cancelled
    return result;
  } catch (error) {
    console.error('error in api file while opening file', error);
    //if error we return an empty array incase of error
    return [];
  }
}
export { closeWindow, minimizeWindow, maximizeWindow, openFileFromDirectory };
