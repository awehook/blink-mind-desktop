import { initI18n } from '../i18n';
import { WindowData } from './window-data';
import { buildMenu } from './main-menu';
import { IpcChannelName } from '../../common';
import { app, BrowserWindow, systemPreferences, ipcMain } from 'electron';
import { isMacOS } from '../utils';

const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');

let windowMgr;

export class WindowMgr {
  currentWindow;
  welcomeWindow;
  fileWindowMap;
  url;

  constructor() {
    this.init();
  }

  init() {
    this.fileWindowMap = new Map();
    this.url = isDev
      ? 'http://localhost:3008'
      : `file://${app.getAppPath()}/index.html`;

    const i18n = initI18n((err, t) => {
      console.error('initCallback', err, t);
      const welcomeWindow = this.createWelcomeWindow();
      buildMenu(i18n);
      i18n.on('languageChanged', lng => {
        buildMenu(i18n);
        welcomeWindow.webContents.send(
          IpcChannelName.I18N_LANG_CHANGED,
          i18n.getDataByLanguage(lng).translation
        );
      });
      this.currentWindow = welcomeWindow;
    });

    ipcMain.on(IpcChannelName.NEW_FILE, (event, arg) => {
      const { closeWelcome } = arg;
      if (closeWelcome && this.welcomeWindow) {
        // TODO
        // this.welcomeWindow.close();
      }

      this.newFile();
    });
  }

  openFile(path) {}

  newFile() {
    this.createFileWindow();
  }

  createWelcomeWindow() {
    const window = new BrowserWindow({
      width: 400,
      height: 400,
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      },
      title: 'New'
    });
    window.loadURL(`${this.url}/#/welcome`);

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
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
    this.welcomeWindow = window;
    return window;
  }

  createFileWindow(filePath) {
    const window = new BrowserWindow({
      width: 1024,
      height: 768,
      center: true,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      },
      title: 'Untitled'
    });
    window.loadURL(`${this.url}/#/file`);

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });

    window.windowData = new WindowData([filePath]);

    return window;
  }
}

export function createWindowMgr() {
  windowMgr = new WindowMgr();
}

export { windowMgr };
