import { ipcMain, BrowserWindow, dialog } from 'electron';
import { IpcChannelName, MrGlobalType, StoreItemKey } from '../../common';
import { i18n} from '../i18n';
import fs from 'fs-extra';
import { getRecentOpenedDir, regularBlinkPath } from '../utils';
import { getStoreItem, setStoreItem } from '../store';
import debug from 'debug';
import { ipcSendToAllWindow } from './ipc-send';
const log = debug('main:ipc-main');

ipcMain.on(IpcChannelName.RM_GET_I18N, (event, arg) => {
  log('RM_GET_I18N');
  event.returnValue = i18n.getTranslation();
});

ipcMain.on(IpcChannelName.RM_SAVE_SYNC, (event, arg) => {
  let { path, content } = arg;
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
  let { path, content } = arg;
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

ipcMain.on(IpcChannelName.RM_GET_FILE_CONTENT, (event, { path }) => {
  event.returnValue = fs.readFileSync(path);
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
