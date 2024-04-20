import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
// // closeApp.js

// import { ipcRenderer } from 'electron';

// export default function manipApp() {
//   // Get references to buttons
//   const minimizeButton = document.getElementById('titleButtonsMin');
//   const maximizeButton = document.getElementById('titleButtonsMax');
//   const closeButton = document.getElementById('titleButtonsClose');

//   // Add click event listeners to buttons
//   minimizeButton.addEventListener('click', () => {
//     ipcRenderer.send('minimize-window');
//   });

//   maximizeButton.addEventListener('click', () => {
//     console.log('max');
//     ipcRenderer.send('maximize-window');
//   });

//   closeButton.addEventListener('click', () => {
//     ipcRenderer.send('close-window');
//   });
// }

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
