import { app, BrowserWindow, systemPreferences } from 'electron';
import { isMacOS } from '../utils';
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');

export function createMainWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 720
  });
  const mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    webPreferences: {
      nodeIntegration: true,
      scrollBounce: true
    },
    title: 'BlinkMind'
  });

  mainWindowState.manage(mainWindow);
  if (isDev) mainWindow.loadURL('http://localhost:3008');
  else mainWindow.loadURL(`file://${app.getAppPath()}/index.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on('resize', () => {


  });

  mainWindow.on('closed', () => {
    app.quit();
  });

  function init() {
    if (isMacOS) {
      let appleHighlightColor = systemPreferences.getUserDefault(
        'AppleHighlightColor',
        'string'
      );
      appleHighlightColor = appleHighlightColor.split(' ');
      global.appleHighlightColor = appleHighlightColor;
    }
  }

  init();

  return mainWindow;
}
