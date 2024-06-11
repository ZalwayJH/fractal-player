import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
const fs = require('fs');
const mm = require('music-metadata');
import { inspect } from 'util';
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
  ipcMain.handle('write:metadata', handleMetaData);
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
        { name: 'Songs (.mp3, .wav, .wma, .mpeg)', extensions: ['mp3', 'wav', 'wma', 'webm'] },
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
  const path = 'src/renderer/src/songList/trackList.json';
  const file = await handleReadFile();
  try {
    const fileMetadataPromises = filePathArray.map(async (filePath) => {
      const metadata = await mm.parseFile(filePath);
      const cover = mm.selectCover(metadata.common.picture); // pick the cover image
      const duration = (
        Math.round((metadata.format.duration / 60 + Number.EPSILON) * 100) / 100
      ).toString();
      return {
        path: filePath.replace(/\\/g, '/'),
        album: metadata.common.album || 'N/a',
        artist: metadata.common.artist || 'N/a',
        title: metadata.common.title || 'N/a',
        duration: duration.length < 3 ? duration + '0' : duration,
        artists: metadata.common.artists || 'N/a',
        format: metadata.format || 'N/a',
        trackNumber: metadata.common.track.no || 'N/a'
        // cover: cover
        // Add other metadata fields as needed
      };
    });

    if (file.length === 0) {
      return writeTracksToFile(path, Promise.all(fileMetadataPromises));
    } else {
      return addNewTracksToFile(file, path, Promise.all(fileMetadataPromises));
    }
  } catch (error) {
    console.error(error);
  }
}

async function addNewTracksToFile(file, path, data) {
  const currentSongs = await file;
  const newSongs = await data;
  const uniqueSongs = new Set(currentSongs.map((track) => track.title));
  const mergedSongs = [];

  for (const track of currentSongs) {
    mergedSongs.push(track);
  }

  for (const track of newSongs) {
    if (!uniqueSongs.has(track.title)) {
      mergedSongs.push(track);
    }
  }

  try {
    fs.writeFile(
      path,
      JSON.stringify(mergedSongs),
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log('successfully updated file');
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function writeTracksToFile(path, data) {
  try {
    fs.writeFile(
      path,
      JSON.stringify(await data),
      {
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log('successfully made first write');
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function handleReadFile() {
  try {
    // Use fs.promises.readFile for a proper async/await pattern
    const filePath = 'src/renderer/src/songList/trackList.json';
    const data = await fs.promises.readFile(filePath, 'utf8');

    const trackList = data.length === 0 ? [] : JSON.parse(data);
    return trackList;
  } catch (error) {
    console.error('here da err', error);
  }
}

ipcMain.handle('read:file', async () => {
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
