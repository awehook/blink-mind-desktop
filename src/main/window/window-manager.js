import { initI18n, i18n } from '../i18n';
import { FileData, WindowData } from './window-data';
import { buildMenu } from './main-menu';
import { I18nTextKey, IpcChannelName, IpcType } from '../../common';
import {
  app,
  BrowserWindow,
  systemPreferences,
  ipcMain,
  dialog
} from 'electron';
import {
  getRecentOpenedDir,
  getUntitledTile,
  isMacOS,
  regularBlinkPath
} from '../utils';
import { dirname } from 'path';
import { setStoreItem, StoreItemKey } from '../store';
import debug from 'debug';
const log = debug('main:window-mgr');

const isDev = require('electron-is-dev');

let windowMgr;

export class WindowMgr {
  currentWindow;
  welcomeWindow;
  fileToWindowMap;
  openedFileWindows;
  url;

  constructor() {
    this.init();
  }

  getOpenedFileWindows() {
    return this.openedFileWindows;
  }

  init() {
    this.fileToWindowMap = new Map();
    this.openedFileWindows = new Set();
    this.url = isDev
      ? 'http://localhost:3008'
      : `file://${app.getAppPath()}/index.html`;

    const i18n = initI18n((err, t) => {
      console.error('initCallback', err, t);
      const welcomeWindow = this.createWelcomeWindow();
      buildMenu(i18n, this);
      i18n.on('languageChanged', lng => {
        buildMenu(i18n);
        welcomeWindow.webContents.send(
          IpcChannelName.I18N_LANG_CHANGED,
          i18n.getDataByLanguage(lng).translation
        );
      });
      this.currentWindow = welcomeWindow;
    });

    ipcMain.on(IpcChannelName.RM_NEW_FILE, (event, arg) => {
      this.newFile();
    });

    ipcMain.on(IpcChannelName.RM_OPEN_FILE, () => {
      this.openFile();
    });
  }

  openFile(path) {
    if (path == null) {
      this.closeWelcomeWindow();
      dialog
        .showOpenDialog(null, {
          defaultPath: getRecentOpenedDir(),
          properties: ['openFile'],
          filters: [
            {
              name: 'bmind format',
              extensions: ['bmind', 'blinkmind']
            }
          ]
        })
        .then(({ canceled, filePaths }) => {
          if (!canceled) {
            if (filePaths.length === 1) {
              const p = filePaths[0];
              setStoreItem(StoreItemKey.recent.openedDir, dirname(p));
              this.openFile(p);
            }
          }
        });
    } else if (this.fileToWindowMap.has(path)) {
      this.fileToWindowMap.get(path).focus();
    } else {
      this.createFileWindow(path);
    }
  }

  newFile() {
    this.createFileWindow();
  }

  createWelcomeWindow() {
    if (this.welcomeWindow) {
      this.welcomeWindow.show();
      return;
    }
    const window = new BrowserWindow({
      width: 400,
      height: 400,
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      },
      title: i18n.t(I18nTextKey.welcomePageTitle)
    });
    window.loadURL(`${this.url}/#/welcome`);

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });

    window.on('closed', () => {
      this.welcomeWindow = null;
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

  closeWelcomeWindow() {
    if (this.welcomeWindow) {
      this.welcomeWindow.close();
    }
  }

  createFileWindow(filePath) {
    this.closeWelcomeWindow();
    const window = new BrowserWindow({
      show: false,
      center: true,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      },
      title: filePath == null ? getUntitledTile() : filePath
    });
    window.loadURL(`${this.url}/#/file`);

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });

    window.on('close', e => {
      e.preventDefault();
      window.webContents.send(IpcChannelName.MR, {
        type: IpcType.MR_BEFORE_CLOSE_WINDOW
      });
    });

    window.on('closed', () => {
      window.windowData.files.forEach(f => {
        f.path && this.fileToWindowMap.delete(f.path);
      });
      this.openedFileWindows.delete(window);
    });

    const files = [new FileData(filePath)];

    window.windowData = new WindowData(files, files[0].id);

    window.setTitleFlag = ({ edited }) => {
      window.setTitle(window.windowData.getFocusFileTitle(edited));
    };

    if (filePath) {
      this.fileToWindowMap.set(filePath, window);
    }

    this.openedFileWindows.add(window);
    window.maximize();
    window.show();

    return window;
  }

  // 注意要更新fileToWindowMap
  saveAs() {
    const focusWindow = BrowserWindow.getFocusedWindow();

    const windowData = focusWindow.windowData;
    if (windowData) {
      const focusFile = windowData.getFocusFile();
      const oldFilePath = focusFile.path;
      dialog
        .showSaveDialog(focusWindow, {
          defaultPath: getRecentOpenedDir()
        })
        .then(v => {
          const { filePath, canceled } = v;
          if (!canceled) {
            const path = regularBlinkPath(filePath);
            // 注意要更新fileToWindowMap
            this.fileToWindowMap.delete(oldFilePath);
            this.fileToWindowMap.set(filePath, focusWindow);
            windowData.saveAs(path);

            focusWindow.setTitleFlag({ edited: false });
            focusWindow.webContents.send(IpcChannelName.MR, {
              type: IpcType.MR_SAVE,
              id: focusFile.id,
              path
            });
          }
        });
    }
  }
}

export function createWindowMgr() {
  windowMgr = new WindowMgr();
}

export { windowMgr };
