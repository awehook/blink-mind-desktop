import { BrowserWindow } from 'electron';
import { extname } from 'path';
import { BlinkMindExtName, BlinkMindExtNames, I18nTextKey, IpcChannelName } from '../../common';
import { i18n } from '../i18n';

export function regularBlinkPath(path) {
  if (BlinkMindExtNames.indexOf(extname(path)) === -1) {
    path = path + BlinkMindExtName;
  }
  return path;
}

export function getUntitledTile() {
  return i18n.t(I18nTextKey.UNTITLED) + BlinkMindExtName;
}

export function getFileTitle(path, edited) {
  path = path || getUntitledTile();
  return `${path}${edited ? ' -' + i18n.t(I18nTextKey.EDITED) : ''}`;
}

export function ipcMR(arg) {
  const focusWindow = BrowserWindow.getFocusedWindow();
  focusWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, arg);
}

export function isDev() {
  const envDevTools = parseInt(process.env.DEV_TOOLS, 10) === 1;
  const dev = require('electron-is-dev');
  return envDevTools || dev;
}

export const IsDev = isDev();
