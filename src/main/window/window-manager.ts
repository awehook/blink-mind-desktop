import debug from 'debug';
import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  systemPreferences
} from 'electron';
import { dirname, join } from 'path';
import {
  I18nTextKey,
  IpcChannelName,
  IpcType,
  MrGlobalType,
  StoreItemKey
} from '../../common';
import { i18n } from '../i18n';
import { ipcSendToAllWindow } from '../ipc';
import { setStoreItem } from '../store';
import {
  getRecentOpenedDir,
  getUntitledTile,
  isMacOS,
  regularBlinkPath
} from '../utils';
import { buildMenu } from './main-menu';
import { FileData, WindowData } from './window-data';
const log = debug('main:window-mgr');

const isDev = require('electron-is-dev');

let windowMgr;

export class WindowMgr {
  welcomeWindow: BrowserWindow;
  preferenceWindow;
  signInWindow;
  fileMap;
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
    this.fileMap = new Map();
    this.fileToWindowMap = new Map();
    this.openedFileWindows = new Set();
    this.url = isDev
      ? 'http://localhost:3018'
      : `file://${app.getAppPath()}/build/renderer/index.html`;
    buildMenu(i18n, this);
    this.showWelcomeWindow();
    i18n.on('languageChanged', ({ language, translation }) => {
      log('languageChanged', language);
      setStoreItem(StoreItemKey.preferences.normal.language, language);
      buildMenu(i18n, this);
      //TODO change window title
      ipcSendToAllWindow(IpcChannelName.MR_GLOBAL, {
        type: MrGlobalType.SET_LANG,
        translation
      });
    });

    ipcMain.on(IpcChannelName.RM_NEW_FILE, (event, arg) => {
      this.newFile(arg);
    });

    ipcMain.on(IpcChannelName.RM_OPEN_FILE, () => {
      this.openFile();
    });
  }

  openFile(path?) {
    if (path == null) {
      if (isMacOS) this.closeWelcomeWindow();
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
      this.createFileWindow({ path });
    }
  }

  newFile({ themeKey }) {
    this.createFileWindow({ themeKey });
  }

  getFileData(id:number) {
    return this.fileMap.get(id);
  }

  showWelcomeWindow() {
    log('showWelcomeWindow');
    if (this.welcomeWindow) {
      this.welcomeWindow.show();
      return;
    }
    log('createWelcomeWindow');
    const window = new BrowserWindow({
      width: 750,
      height: 395,
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        preload: join(__dirname,'./welcome-preload'),
        scrollBounce: true
      },
      title: i18n.t(I18nTextKey.WELCOME_PAGE_TITLE)
    });
    window.loadURL(`${this.url}/#/welcome`);
    window.setMenu(null);
    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });



    window.on('close', (e) => {
      window.hide();
      e.preventDefault();
    });

    function init() {
      if (isMacOS) {
        let appleHighlightColor = systemPreferences.getUserDefault(
          'AppleHighlightColor',
          'string'
        );
        appleHighlightColor = appleHighlightColor.split(' ');
        //@ts-ignore
        global.appleHighlightColor = appleHighlightColor;
      }
    }

    init();
    this.welcomeWindow = window;
    return window;
  }

  showPreferencesWindow() {
    if (this.preferenceWindow) {
      this.preferenceWindow.show();
      return;
    }
    const window = new BrowserWindow({
      width: 550,
      height: 150,
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      },
      title: i18n.t(I18nTextKey.PREFERENCES)
    });
    window.loadURL(`${this.url}/#/preferences`);
    window.setMenu(null);
    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });

    window.on('closed', () => {
      this.preferenceWindow = null;
    });

    this.preferenceWindow = window;
    return window;
  }

  showSignInWindow() {
    if (this.signInWindow) {
      this.signInWindow.show();
      return;
    }
    const window = new BrowserWindow({
      width: 550,
      height: 400,
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        scrollBounce: true
      }
    });
    window.loadURL(`${this.url}/#/signin`);
    window.setMenu(null);
    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });

    window.on('closed', () => {
      this.signInWindow = null;
    });

    this.signInWindow = window;
    return window;
  }

  closeWelcomeWindow() {
    if (this.welcomeWindow) {
      this.welcomeWindow.close();
    }
  }

  createFileWindow(arg) {
    const { path } = arg;

    const window = new BrowserWindow({
      show: false,
      center: true,
      webPreferences: {
        nodeIntegration: true,
        preload: join(__dirname,'./preload'),
        scrollBounce: true
      },

      titleBarStyle: isMacOS ? 'hidden' : 'default',
      title: path == null ? getUntitledTile() : path
    });
    window.loadURL(`${this.url}/#/file`);

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
      this.closeWelcomeWindow();
    });

    window.on('close', e => {
      e.preventDefault();
      window.webContents.send(IpcChannelName.MR_FILE_WINDOW, {
        type: IpcType.MR_BEFORE_CLOSE_WINDOW
      });
    });

    window.on('closed', () => {
      //@ts-ignore
      window.windowData.files.forEach(f => {
        f.path && this.fileToWindowMap.delete(f.path);
      });
      this.openedFileWindows.delete(window);
    });

    const files = [new FileData(arg)];
    this.fileMap.set(files[0].id, files[0]);
    //@ts-ignore
    window.windowData = new WindowData(files, files[0].id);

    //@ts-ignore
    window.setTitleFlag = ({ edited }) => {
      //@ts-ignore
      window.windowData.setFocusFileEdited(edited);
      //@ts-ignore
      window.setTitle(window.windowData.getFocusFile().getTitle());
    };

    if (path) {
      this.fileToWindowMap.set(path, window);
    }

    this.openedFileWindows.add(window);
    window.maximize();
    window.show();

    return window;
  }

  // 注意要更新fileToWindowMap
  saveAs() {
    const focusWindow = BrowserWindow.getFocusedWindow();

    //@ts-ignore
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

            //@ts-ignore
            focusWindow.setTitleFlag({ edited: false });
            focusWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, {
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
  log('createWindowMgr');
  windowMgr = new WindowMgr();
}

export { windowMgr };
