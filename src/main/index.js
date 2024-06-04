import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
const fs = require('fs');
const mm = require('music-metadata');

async function createWindow() {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: process.platform === 'win32' ? 'hidden' : 'visible',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('get:metaData', handleMetaData);
  // ipcMain.handle('read-file', handleReadFile);
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// IPC handlers
ipcMain.on('minimize-window', () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('maximize-window', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow.isMaximized()) {
    focusedWindow.unmaximize();
  } else {
    focusedWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow().close();
});

async function handleFileOpen() {
  return await dialog
    .showOpenDialog(BrowserWindow.mainWindow, {
      title: 'Select Songs or Playlists Folders',
      properties: ['OpenFile', 'multiSelections'],
      filters: [
        { name: 'Songs (.mp3, .wav, .wma, .mpeg)', extensions: ['mp3', 'wav', 'wma', 'mpeg'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    })
    .then(async (result) => {
      if (result.canceled) {
        console.log('file dialogue was cancelled');
        return [];
      } else {
        // console.log('file paths wre selected:', result.filePaths);
        return result.filePaths;
      }
    })
    .catch((error) => {
      console.log('error opening file dialog', error);
    });
}

async function handleMetaData(channel, filePathArray) {
  try {
    const fileMetadataPromises = filePathArray.map(async (filePath) => {
      const metadata = await mm.parseFile(filePath);
      return {
        path: filePath,
        album: metadata.common.album || 'N/a',
        artist: metadata.common.artist || 'N/a',
        title: metadata.common.title || 'N/a',
        duration: Math.round((metadata.format.duration / 60 + Number.EPSILON) * 100) / 100 || 'N/a',
        artists: metadata.common.artists || 'N/a',
        format: metadata.format || 'N/a',
        trackNumber: metadata.common.track.no || 'N/a'
        // Add other metadata fields as needed
      };
    });
    // fs.writeFile('../renderer/songList/trackList.txt', JSON.stringify(songListSet), (err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('file written succesfully with the following contents:');
    //     console.log(fs.readFileSync('../../songList/trackList.txt', 'utf-8'));
    //   }
    // });
    return writeTracksToFile(
      'src/renderer/songList/trackList.json',
      Promise.all(fileMetadataPromises)
    );
  } catch (error) {
    console.error(error);
  }
}

async function writeTracksToFile(filePath, data) {
  const file = await handleReadFile();
  const tracks = await data;
  let combinedData = data;
  //should be mapped!! extract paths from data and file then create new arrray?
  if (file.length !== 0) {
    combinedData = file;
    for (let i = 0; i < file.length; i++) {
      for (let j = 0; j < tracks.length; j++) {
        if (file[i].path !== tracks[j]) {
          combinedData.push(tracks[j]);
        }
      }
    }
  }

  try {
    fs.writeFile(
      filePath,
      JSON.stringify(await combinedData),
      {
        encoding: 'utf8',
        flag: 'a'
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log('success');
        }
      }
    );
    // return handleReadFile();
  } catch (error) {
    console.error(error);
  }
}

async function handleReadFile() {
  try {
    // Use fs.promises.readFile for a proper async/await pattern
    const filePath = 'src/renderer/songList/trackList.json';
    const data = await fs.promises.readFile(filePath, 'utf8');

    const trackList = data.length === 0 ? [] : JSON.parse(data);
    return trackList;
  } catch (error) {
    console.error('here da err', error);
  }
}

ipcMain.handle('read-file', async () => {
  return await handleReadFile().then((result) => {
    return result;
  });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
