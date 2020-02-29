import debug from 'debug';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs-extra';
import fontList from 'font-list';
import { IpcChannelName, MrGlobalType, StoreItemKey } from '../../common';
import { i18n } from '../i18n';
import { getStoreItem, setStoreItem } from '../store';
import { getRecentOpenedDir, regularBlinkPath } from '../utils';
import { ipcSendToAllWindow } from './ipc-send';
import { windowMgr } from '../window/window-manager';
import {apiAgent} from "../../common";

const log = debug('main:ipc-main');

ipcMain.on(IpcChannelName.RM_GET_I18N, (event, arg) => {
  log('RM_GET_I18N');
  event.returnValue = i18n.getTranslation();
});

ipcMain.on(IpcChannelName.RM_SAVE_SYNC, (event, arg) => {
  const { content } = arg;
  let { path } = arg;
  if (path == null) {
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: getRecentOpenedDir()
    });
  }

  if (path == null) {
    event.returnValue = 'cancel';
    return;
  }

  path = regularBlinkPath(path);

  fs.writeFileSync(path, content);
  event.returnValue = 'save';
});

ipcMain.on(IpcChannelName.RM_SAVE, (event, arg) => {
  const { content } = arg;
  let { path } = arg;
  if (path == null) {
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: getRecentOpenedDir()
    });
  }
  if (path == null) {
    return;
  }
  path = regularBlinkPath(path);
  fs.writeFile(path, content);
});

ipcMain.on(IpcChannelName.RM_MAXIMUM_WINDOW, event => {
  BrowserWindow.getFocusedWindow().maximize();
});

ipcMain.on(IpcChannelName.RM_GET_FOCUS_FILE_TITLE, (event, { fileId }) => {
  //@ts-ignore
  event.returnValue = windowMgr.getFileData(fileId).getTitle();
});

ipcMain.on(IpcChannelName.RM_GET_FILE_CONTENT, (event, { path }) => {
  event.returnValue = fs.readFileSync(path);
});

ipcMain.on(IpcChannelName.RM_GET_FONT_LIST, event => {
  fontList
    .getFonts()
    .then(fonts => {
      event.returnValue = fonts.map(item => item.replace(/^"|"$/g, ''));
    })
    .catch(err => {
      event.returnValue = [];
    });
});

ipcMain.on(IpcChannelName.RM_GET_STORE_ITEM, (event, { key, defaultValue }) => {
  event.returnValue = getStoreItem(key, defaultValue);
});

ipcMain.on(IpcChannelName.RM_SET_STORE_ITEM, (event, { key, value }) => {
  log('RM_SET_STORE_ITEM', { key, value });
  setStoreItem(key, value);
  switch (key) {
    case StoreItemKey.preferences.normal.appearance:
      ipcSendToAllWindow(IpcChannelName.MR_GLOBAL, {
        type: MrGlobalType.SET_APPEARANCE,
        appearance: value
      });
      break;
    case StoreItemKey.preferences.normal.language:
      i18n.changeLanguage(value);
      break;
    default:
      break;
  }
});

ipcMain.on(IpcChannelName.RM_SIGN_IN, (event, { email, password }) => {

  apiAgent.device.signIn()
});
