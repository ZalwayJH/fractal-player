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
    console.log('file paths recieved in api file', result);
    return result; // Ensure this value is returned properly
  } catch (error) {
    console.error('error in api file while opening file', error);
    return []; // Handle errors gracefully
  }
}
export { closeWindow, minimizeWindow, maximizeWindow, openFileFromDirectory };
