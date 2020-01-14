import { app, BrowserWindow, systemPreferences } from 'electron';
import { setUserDefault } from './store-util';
import { isMacOS } from './utils';
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
      scrollBounce: true,
      preload: __dirname + '/preload.js'
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
  let resizeTimeout;
  mainWindow.on('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      let size = mainWindow.getSize();
      setUserDefault('mainWindowWidth', size[0]);
      setUserDefault('mainWindowHeight', size[1]);
    }, 600);
  });

  mainWindow.on('closed', () => {
    //mainWindow = null;
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
