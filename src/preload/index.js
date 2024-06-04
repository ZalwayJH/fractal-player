import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const API = {
  api: {
    send: (channel, data) => {
      let validChannels = ['close-window', 'minimize-window', 'maximize-window', 'toMain'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    recieve: (channel, func) => {
      let validChannels = ['fromMain'];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    invoke: async (channel, filePath, data) => {
      let validChannels = ['dialog:openFile', 'get:metaData', 'read-file'];
      if (validChannels.includes(channel)) {
        try {
          const result = await ipcRenderer.invoke(channel, filePath, data);
          // console.log(result, 'in preload');
          return result;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  // {
  // close: () => ipcRenderer.send('close-window'),
  // minimize: () => ipcRenderer.send('minimize-window'),
  // maximize: () => ipcRenderer.send('maximize-window')
  // openFile: () =>
  //   ipcRenderer
  //     .invoke('dialog:openFile')
  //     .then((result) => {
  //       console.log('File paths received in preload script:', result);
  //       return result;
  //     })
  //     .catch((error) => {
  //       console.error('Error in preload script while opening file:', error);
  //       throw error;
  //     })
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('app', API);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = { electronAPI };
  window.app = API;
}
