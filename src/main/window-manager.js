import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { IpcChannelMain, IpcChannelRenderer } from '../common/';
import { userDefault } from './store-util';
import { createMainWindow } from './main-window';
import { menu } from './main-menu';

const isDev = require('electron-is-dev');

export function initWindowManager() {
  let openingFileWindows = {};
  const mainWindow = createMainWindow();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  ipcMain.on(IpcChannelMain.OPEN_FILE, function(event, fileId) {
    console.log(`pcMain OPEN_SINGLE_FILE ${fileId}`);
    let fileWindow = openingFileWindows[fileId];
    if (fileWindow) {
      fileWindow.show();
    } else {
      console.log(`pcMain OPEN_SINGLE_FILE send ${fileId}`);
      mainWindow.webContents.send(IpcChannelRenderer.OPEN_FILE, fileId);
    }
  });

  ipcMain.on(IpcChannelMain.OPEN_SINGLE_FILE, function(event, fileId, title) {
    console.log(`ipcMain OPEN_SINGLE_FILE ${fileId} ${title}`);
    let fileWindow = openingFileWindows[fileId];
    if (!fileWindow) {
      fileWindow = new BrowserWindow({
        title: title,
        width: userDefault.fileWindowWidth,
        height: userDefault.fileWindowHeight,
        minWidth: 800,
        minHeight: 600,
        show: false,
        titleBarStyle: 'hidden'
      });
      fileWindow.on('closed', () => {
        console.log(`closed ${fileId}`);
        delete openingFileWindows[fileId];
      });
      if (isDev) fileWindow.loadURL(`http://localhost:3008/#/doc/${fileId}`);
      else
        fileWindow.loadURL(
          `file://${app.getAppPath()}/index.html#/doc/${fileId}`
        );

      openingFileWindows[fileId] = fileWindow;
      fileWindow.show();
    } else {
      fileWindow.show();
    }
  });
}
