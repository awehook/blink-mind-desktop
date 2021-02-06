import debug from 'debug';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs-extra';
import { resolve } from 'path';
import fontList from 'font-list';
import {
  BlinkMindExtName,
  I18nTextKey,
  IpcChannelName,
  MrGlobalType,
  StoreItemKey
} from '../../common';
import { i18n } from '../i18n';
import { getStoreItem, setStoreItem } from '../store';
import { getRecentOpenedDir, regularBlinkPath, IsDev } from '../utils';
import { ipcSendToAllWindow } from './ipc-send';
import { windowMgr } from '../window/window-manager';
import { apiAgent } from '../../common';
import * as Sentry from '@sentry/electron';

const log = debug('main:ipc-main');

ipcMain.on(IpcChannelName.RM_GET_I18N, (event, arg) => {
  log('RM_GET_I18N');
  event.returnValue = i18n.getTranslation();
});

ipcMain.on(IpcChannelName.RM_SAVE_SYNC, (event, arg) => {
  log('RM_SAVE_SYNC');
  const { content } = arg;
  let { path } = arg;
  if (path == null) {
    const defaultName = i18n.t(I18nTextKey.UNTITLED) + BlinkMindExtName;
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: resolve(getRecentOpenedDir(), defaultName)
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
  log('RM_SAVE');
  const { content } = arg;
  let { path } = arg;
  const focusWindow = BrowserWindow.getFocusedWindow();
  //@ts-ignore
  focusWindow.setTitleFlag({ edited: false });
  if (path == null) {
    const defaultName = i18n.t(I18nTextKey.UNTITLED) + BlinkMindExtName;
    console.log(defaultName);
    path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
      defaultPath: resolve(getRecentOpenedDir(), defaultName)
    });
  }
  if (path == null) {
    return;
  }
  path = regularBlinkPath(path);
  fs.writeFile(path, content);
});

ipcMain.on(IpcChannelName.RM_MAXIMUM_WINDOW, event => {
  log('RM_MAXIMUM_WINDOW');
  BrowserWindow.getFocusedWindow().maximize();
});

ipcMain.on(IpcChannelName.RM_GET_FOCUS_FILE_TITLE, (event, { fileId }) => {
  //@ts-ignore
  event.returnValue = windowMgr.getFileData(fileId).getTitle();
});

ipcMain.on(IpcChannelName.RM_GET_FILE_CONTENT, (event, { path }) => {
  event.returnValue = fs.readFileSync(path, 'utf8');
});

ipcMain.handle(IpcChannelName.RM_GET_FONT_LIST, async event => {
  try {
    const fonts = await fontList.getFonts();
    return fonts.map(item => item.replace(/^"|"$/g, ''));
  } catch (e) {
    Sentry.captureException(e);
    return [];
  }
});

ipcMain.on(IpcChannelName.RM_GET_IS_DEV, event => {
  event.returnValue = IsDev;
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
  // apiAgent.device.signIn()
});
